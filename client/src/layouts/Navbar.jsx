import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

import { HiBars3BottomRight } from "react-icons/hi2";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const [popper, setPopper] = useState(false);

  const mobilePopper = () => {
    setPopper((prev) => !prev);
  };

  return (
    <nav>
      <div className="navbar_border">
        <div className="container navbar">
          <NavLink to="/">
            <h1 className="navbar_title">Blog GEZ</h1>
          </NavLink>

          {isLoggedIn ? (
            <div className="navbar_lr">
              <NavLink to="/profile" className="navbar_l">
                Profile
              </NavLink>
              <NavLink to="/logout" className="navbar_l">
                Logout
              </NavLink>
            </div>
          ) : (
            <>
              <div className="navbar_lr">
                <NavLink className="navbar_l" to="/login">
                  Login
                </NavLink>
                <NavLink className="navbar_r" to="/register">
                  Become an Author
                </NavLink>
              </div>
            </>
          )}

          <div className="navbarMobile">
            <button onClick={mobilePopper}>{<HiBars3BottomRight />}</button>
            {popper && (
              <div className="navbarMobileContent">
                {isLoggedIn ? (
                  <div>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                  </div>
                ) : (
                  <>
                    <div className="navbar_lr">
                      <NavLink to="/login">Login</NavLink>
                      <NavLink to="/register">Become an Author</NavLink>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* breadcrumb */}
      <div className="navbar_border">
        <div className="navbar_breadcrumb container">
          <div className="breadcrumb_ox">
            <a href="/travel">
              <p className="breadcrumb_oxHead">Travel</p>
              <p className="breadcrumb_oxDesc">Everywhere</p>
            </a>

            <a href="/politics">
              <p className="breadcrumb_oxHead">Politics</p>
              <p className="breadcrumb_oxDesc">whats happening</p>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
