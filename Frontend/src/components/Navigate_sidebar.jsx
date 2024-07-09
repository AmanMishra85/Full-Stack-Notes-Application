import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sideNote from "../Images/thisBoy.jpg";
import { NoteContext } from "../context/NoteContext";

function Navigate_sidebar({ handleClick, userData, handleLogout, handlePic }) {
  const { myNotes } = useContext(NoteContext);
  const [lesson,setLesson] = useState('');


  useEffect(() => {
    document.body.style.overflowY = "hidden";
    
    return () => {
      document.body.style.overflowY = "scroll";
    };
  },[]);

  const handlePicChange = async (e) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    handlePic(userData.Token);
  };

  return (
    <motion.div
      className="z-50 absolute w-[100vw]"
      initial={{ x: "-80%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {userData != null ? (
        <section>
          <div
            className="md:hidden fixed top-0 left-0 right-0 bottom-0 cursor-auto"
            onClick={handleClick}
          ></div>
          <div>
            <div className="md:hidden pt-[1px] bg-gray-100 w-[70vw] sm:w-[40vw] opacity-[0.98] shadow-xl cursor-auto border-r-[1px] h-screen">
              <div className="">
                <div className="flex justify-center items-center flex-col mt-8 gap-6 mx-2">
                  <section className="flex items-center flex-col">
                    <div>
                      <img
                        src={userData.img}
                        className="w-32 h-32 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-xl font-semibold p-2">
                        Hi @{`${userData.Email.split("@")[0]}`}
                      </p>
                    </div>
                  </section>
                  <section className="bg-blue-500 w-full text-center p-2 hover:cursor-pointer rounded-full text-white text-md">
                    <div>
                      <button onClick={handlePicChange}>Change Profile</button>
                    </div>
                  </section>
                  <section className="bg-blue-500 w-full text-center p-2 hover:cursor-pointer rounded-full text-white text-md">
                    {myNotes && myNotes.length != 0 ? (
                      <div>Total Notes : {myNotes.length}</div>
                    ) : (
                      <div>Hi {userData.Name}</div>
                    )}
                  </section>
                  <section className="bg-blue-500 w-full text-center p-2 hover:cursor-pointer rounded-lg text-white text-md">
                    <div className="">
                     {" > " +userData.quotes}
                    </div>
                  </section>
                </div>
                <div className="mx-2 flex justify-center items-center">
                  <button
                    className="flex justify-center items-center bg-red-500 text-white p-2 rounded-lg w-44 relative sm:top-[13vh] top-[5vh]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>
          <div
            className="fixed top-0 right-0 left-0 bottom-0"
            onClick={handleClick}
          ></div>
          <div className="border-r-2 md:hidden flex flex-col font-normal text-xl py-2 px-2 bg-white opacity-[0.98] h-screen w-[70vw] sm:w-[40vw]">
            <div>
              <Link to="/signin">
                <p
                  className="hover:bg-blue-500 px-2 py-4 rounded-md text-center hover:text-white"
                  onClick={handleClick}
                >
                  Create Notes
                </p>
              </Link>
              <Link to="/signin">
                <p
                  className="hover:bg-blue-500 px-2 py-4 rounded-md text-center hover:text-white"
                  onClick={handleClick}
                >
                  Sign-in
                </p>
              </Link>
              <Link to="/signup">
                <p
                  className="hover:bg-blue-500 px-2 py-4 rounded-md text-center hover:text-white"
                  onClick={handleClick}
                >
                  Sign-up
                </p>
              </Link>
              <div onClick={()=>document.getElementById('about').scrollIntoView({behavior:'smooth'})}>
                <p
                  className="hover:bg-blue-500 px-2 py-4 rounded-md text-center hover:text-white"
                  onClick={handleClick}
                >
                  How it works
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6 items-center">
              <img src={sideNote} className="w-44" />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Navigate_sidebar;
