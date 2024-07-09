import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Image from "../Images/notes_logo.png";
import { Menu, X } from "lucide-react";
import { UserContext } from "../context/Context";
import { motion } from "framer-motion";
import Navigate_sidebar from "./Navigate_sidebar";

function Navbar() {
  const { userData, setUserData, logoutUser, changeUserPic } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    logoutUser();
    setSidebar(false);
    navigate("/signin");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10">
      <div
        className={`relative top-0 left-0 w-full bg-white shadow-sm transition-all duration-300 ease-in-out z-50 ${
          isScrolled
            ? "backdrop-filter backdrop-blur-md bg-opacity-40"
            : "backdrop-filter backdrop-blur-none bg-opacity-100"
        }`}
      >
        <div className="bg-opacity shadow-sm border-b-[1px] px-2 py-4">
          <div className="flex justify-between mx-6 lg:mx-12 items-center">
            <section className="flex justify-center  items-baseline sm:items-center">
              <section className="md:hidden relative right-4">
                <button onClick={() => setSidebar(!sidebar)}>
                  {sidebar ? <X size={33} /> : <Menu size={33} />}
                </button>
              </section>
              <Link to="/" className="flex gap-2 justify-center items-center">
                <img src={Image} className="sm:w-12 w-8" />
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  Notes
                </p>
              </Link>
            </section>
            <section className="hidden md:block">
              <div className="flex justify-center items-center gap-6 mr-8 lg:mr-16 lg:gap-8 font-normal text-xl">
                <Link to="/">
                  <p className="p-1 hover:border-b-2 hover:border-blue-600">
                    Home
                  </p>
                </Link>
                <Link to="/create" className={`${userData ? "block":"hidden"}`}>
                  <p className="p-1 hover:border-b-2 hover:border-blue-600">
                    Create
                  </p>
                </Link>
                {userData != null ? (
                  <div>
                    <div className="flex items-center gap-2 rounded-2xl px-2 cursor-pointer">
                      <img
                        src={userData.img}
                        className="w-12 h-12 rounded-full"
                        alt="User"
                      />
                      <p className="capitalize text-xl">
                        {userData.auth
                          ? userData.Name
                          : userData.Name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-8">
                    <div
                      onClick={() =>
                        document
                          .getElementById("about")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <p className="p-1 hover:border-b-2 hover:border-blue-600 cursor-pointer">
                        How it works
                      </p>
                    </div>
                    <Link to="/signin">
                      <p className="border-2 border-blue-600 p-1 rounded-md">
                        Sign-in
                      </p>
                    </Link>
                    <Link to="/signup">
                      <p className="border-2 border-blue-600 bg-blue-600 text-white p-1 rounded-md ">
                        Signup
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </section>
            <section className="md:hidden">
              {userData != null ? (
                <div>
                  <div className="flex items-center gap-2 rounded-2xl text-xl px-2 py-1 cursor-pointer relative left-6 sm:left-4">
                    <img
                      src={userData.img}
                      alt="user"
                      className="rounded-full w-10 h-10 sm:border-none border-2 border-blue-500"
                    />
                    <p className="capitalize font-semibold text-gray-700 text-lg md:text-xl">
                      {userData.Name.split(" ")[0]}
                    </p>
                  </div>
                </div>
              ) : (
                <Link to="/signin">
                  <p className="border-2 border-blue-600 bg-blue-600 hover:bg-gray-200 hover:text-black text-white p-1 rounded-md text-lg sm:text-2xl">
                    Sign-In
                  </p>
                </Link>
              )}
            </section>
          </div>
        </div>
        {sidebar && (
          <Navigate_sidebar
            handleClick={handleClick}
            userData={userData}
            handleLogout={handleLogout}
            handlePic={changeUserPic}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
