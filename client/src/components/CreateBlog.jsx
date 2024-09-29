import { useState } from "react";
import { useAuth } from "../store/auth";
import MDEditor from "@uiw/react-md-editor";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function CreateBlog() {
  const { user, SERVER_URI, successToast, errorToast } = useAuth();
  const [body, setBody] = useState("");
  const [create, setCreate] = useState({
    title: "",
    category: "Travel",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setCreate({ ...create, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const request = await fetch(`${SERVER_URI}/api/blog/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: create.title,
        body,
        category: create.category,
        author: user._id,
      }),
    });

    const response = await request.json();

    if (request.status === 201) {
      successToast(response.message);
      setBody("");
      setCreate({
        title: "",
        category: "Travel",
      });
    } else errorToast(response.message);
  };

  return (
    <section>
      <form onSubmit={submit} className="create_form">
        <h1 className="profileHeader">&lt; Create a Blog &gt;</h1>
        <input
          onChange={handleInput}
          value={create.title}
          name="title"
          type="text"
          placeholder="Blog title"
        />

        <section data-color-mode="light">
          <MDEditor
            value={body}
            onChange={(e) => {
              setBody(e);
            }}
            name="body"
            preview="edit"
            visibleDragbar={true}
            height="100%"
          />

          <MDEditor.Markdown
            source={create.body}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </section>

        <div className="create_form_cat">
          <p>Category:</p>
          <select
            onChange={handleInput}
            value={create.category}
            name="category">
            <option value="Travel">Travel</option>
            <option value="Politics">Politics</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>

      <ToastContainer />
    </section>
  );
}
