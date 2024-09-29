import Markdown from "react-markdown";
import { useAuth } from "../store/auth";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function SingleBlog() {
  const { SERVER_URI, defaultAvatar, user, token } = useAuth();
  const { id } = useParams();
  const [single, setSingle] = useState({});
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const GetSingle = async () => {
    const request = await fetch(`${SERVER_URI}/api/blog/single`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: id }),
    });

    const response = await request.json();

    if (request.status === 200) setSingle(response);
    else console.log(response.message);
  };

  const GetComments = async () => {
    try {
      const request = await fetch(`${SERVER_URI}/api/comment/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const response = await request.json();

      if (request.status === 200)
        if (response?.comments?.length === 0) {
          console.log("im here");
          setComments([]);
        } else {
          console.log("im here too");
          setComments(response);
        }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const addComment = async () => {
    if (!newComment) return;

    setIsLoading(true);

    try {
      const request = await fetch(`${SERVER_URI}/api/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      });

      const response = await request.json();

      if (request.status === 201) {
        setComments((prev) => [...prev, response.comment]);
        setNewComment("");
      } else setError(response.message || "Failed to add comment.");
    } catch (err) {
      setError("Error adding comment.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const request = await fetch(`${SERVER_URI}/api/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (request.status === 200)
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
    } catch (err) {
      setError("Error deleting comment.");
    }
  };

  const startEditingComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedComment(currentText);
  };

  const submitEditedComment = async (commentId) => {
    try {
      const request = await fetch(`${SERVER_URI}/api/comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ content: editedComment }), // Send the updated comment
      });

      const response = await request.json();

      if (request.status === 200) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, body: editedComment }
              : comment
          )
        );

        setEditingCommentId(null);
      } else setError(response.message || "Failed to edit comment.");
    } catch (err) {
      setError("Error editing comment.");
    }
  };

  useEffect(() => {
    GetSingle();
    GetComments();
  }, []);

  console.log("Comment ", comments);

  // <button>{<BiEdit />}</button>;

  return (
    <section className="container singleBlog">
      {single && single.image && (
        <img
          src={single.image}
          alt="alt-img"
          draggable="false"
          className="singleBlogImage"
        />
      )}

      <h1 className="blogTitle">{single && single.title}</h1>
      <Markdown className="singleBody">{single && single.body}</Markdown>

      {single && (
        <div className="singleBlogAuthor">
          <div>
            <img
              className="authorImageSingleBlog"
              src={
                single.author && single.author.avatar
                  ? single.author.avatar
                  : defaultAvatar
              }
              alt="author-image"
              draggable="false"
            />
          </div>
          <div>
            <div className="author_name_single_blog">
              <p>{single.author && single.author.name}</p>
            </div>

            <p>{single && String(single.createdAt).slice(0, 10)}</p>
          </div>
        </div>
      )}

      {/* <div className="commentsSection">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments?.map((comment, index) => (
              <li key={index} className="commentItem">
                <h6>{comment?.author?.name}: </h6>
                <p>{comment?.body}</p>
                {comment?.author?._id === user?._id && (
                  <>
                    <button
                      onClick={() =>
                        startEditingComment(comment._id, comment.body)
                      }>
                      <BiEdit />
                    </button>{" "}
                    &nbsp; &nbsp;
                    <button onClick={() => deleteComment(comment?._id)}>
                      {<RiDeleteBin2Line />}
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div> */}

      <div className="commentsSection">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="commentItem">
                {editingCommentId === comment._id ? (
                  <>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button onClick={() => submitEditedComment(comment._id)}>
                      Save
                    </button>
                    &nbsp; &nbsp;
                    <button onClick={() => setEditingCommentId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h6>{comment.author.name}:</h6>
                    <p>{comment.body}</p>
                    {comment.author._id === user?._id && (
                      <>
                        <button
                          onClick={() =>
                            startEditingComment(comment._id, comment.body)
                          }>
                          <BiEdit />
                        </button>
                        &nbsp; &nbsp;
                        <button onClick={() => deleteComment(comment._id)}>
                          <RiDeleteBin2Line />
                        </button>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {user ? (
        <div className="addComment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={addComment} disabled={isLoading}>
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <p>You need to log in to post a comment.</p>
      )}
    </section>
  );
}
