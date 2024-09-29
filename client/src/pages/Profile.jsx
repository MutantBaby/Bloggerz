import { useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

import MyBlogs from "../components/MyBlogs";
import CreateBlog from "../components/CreateBlog";
import EditProfile from "../components/EditProfile";
import ProfileHeader from "../components/ProfileHeader";

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const [edit, setEdit] = useState(false);
  const [blogs, setBlogs] = useState(true);
  const [create, setCreate] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <section className="container">
          <ProfileHeader />

          <section className="profile_relatables">
            <button
              onClick={() => {
                setBlogs(true);
                setCreate(false);
                setEdit(false);
              }}>
              My Blogs
            </button>
            <button
              onClick={() => {
                setBlogs(false);
                setCreate(true);
                setEdit(false);
              }}>
              Create Blog
            </button>
            <button
              onClick={() => {
                setBlogs(false);
                setCreate(false);
                setEdit(true);
              }}>
              Edit Profile
            </button>
          </section>

          {blogs && <MyBlogs />}
          {create && <CreateBlog />}
          {edit && <EditProfile />}
        </section>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
