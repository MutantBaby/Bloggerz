import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let SERVER_URI = import.meta.env.VITE_SERVER_URI;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("logger"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const defaultAvatar =
    "https://i.pinimg.com/564x/dd/1d/e6/dd1de6d91467f98928ede3a7798dbb23.jpg";

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("logger", serverToken);
  };

  const deleteTokenInLS = () => {
    setUser(null); // empty out user
    return localStorage.removeItem("logger");
  };

  const authenticate = async () => {
    try {
      const request = await fetch(`${SERVER_URI}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      });

      const response = await request.json();

      if (request.status === 200) {
        setUser(response);
        setLoading(false);
      } else setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  function successToast(message) {
    toast.success(`${message}`, {
      theme: "light",
      autoClose: 1000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      position: "top-right",
      hideProgressBar: false,
    });
  }

  function errorToast(message) {
    toast.error(`${message}`, {
      theme: "light",
      draggable: true,
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      position: "top-right",
      hideProgressBar: false,
    });
  }

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        SERVER_URI,
        errorToast,
        isLoggedIn,
        authenticate,
        successToast,
        defaultAvatar,
        setIsLoggedIn,
        storeTokenInLS,
        deleteTokenInLS,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
