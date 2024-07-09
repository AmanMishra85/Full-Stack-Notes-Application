import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../context/NoteContext";
import {Quote,ChevronsRight} from 'lucide-react';

function FullSideBar({ userData }) {
  const { logoutUser, changeUserPic } = useContext(UserContext);
  const { myNotes } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    navigate("/signin");
    logoutUser();
  };

  const handlePicChange = async (e) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    changeUserPic(userData.Token);
  };

  return (
    <div className="pt-[1px] w-[18vw] fixed border-gray-200 shadow-xl border-r-[1px] h-screen">
      <div className="">
        <div className="flex justify-center items-center flex-col mt-8 gap-6 mx-2">
          <section className="flex items-center flex-col">
            <div>
              <img src={userData.img} className="w-32 h-32 rounded-full" />
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
            {myNotes && myNotes.length!=0? (
              <div>Total Notes : {myNotes.length}</div>
            ) : (
              <div>Hi {userData.Name}</div>
            )}
          </section>
          <section className="bg-blue-500 w-full text-center p-2 hover:cursor-pointer rounded-lg text-white text-md">
            <div className="flex justify-center items-center"><p><ChevronsRight/></p>{userData.quotes}</div>
          </section>
          
        </div>
        <div className="mx-2 flex justify-center items-center">
          <div className="flex justify-center items-center bg-red-500 text-white p-2 rounded-full w-[12vw] relative top-[15vh]">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FullSideBar);
