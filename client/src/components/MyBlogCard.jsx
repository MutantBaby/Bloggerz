import { useState } from "react";
import { useAuth } from "../store/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";

export default function MyBlogCard({ id, title, body }) {
  const { SERVER_URI, successToast, errorToast, authenticate } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const edit_blog = async () => {
    const request = await fetch(`${SERVER_URI}/api/blog/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title: editedTitle, body: editedBody }),
    });

    const response = await request.json();

    if (request.status === 200) {
      successToast(response.message);
      authenticate();
      setIsEditing(false);
    } else errorToast(response.message);
  };

  const delete_blog = async () => {
    const request = await fetch(`${SERVER_URI}/api/blog/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const response = await request.json();
    if (request.status === 200) {
      successToast(response.message);
      authenticate();
    } else errorToast(response.message);
  };

  return (
    <div className="my_single_blog">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <button onClick={edit_blog}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <a href={`/blog/${id}`}>
            {title} <FiArrowUpRight />
          </a>
          <p className="my_single_blog_desc">{`${String(
            body.slice(0, 100)
          )}...`}</p>
          <div className="my_blogs_buttons">
            <button onClick={() => setIsEditing(true)}>
              <BiEdit />
            </button>
            <button onClick={delete_blog}>
              <RiDeleteBin2Line />
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
