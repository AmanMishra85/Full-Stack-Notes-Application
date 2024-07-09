import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import NormalWrapper from "../NormalWrapper";
import { NoteContext } from "../context/NoteContext";
import FullSideBar from "../components/FullSideBar";
import { UserContext } from "../context/Context";
import toast,{ Toaster } from "react-hot-toast";

function CreateNotes() {
  const { myNotes, addNotes } = useContext(NoteContext);
  const {userData} = useContext(UserContext);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "title") {
      if (e.target.value.length > 59) {
        toast.error("Character Limit Reached!");
      }
    }
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleSubmit = async(e) => {
    if (localStorage.getItem("userData")) {
      e.preventDefault();
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (newNote.title === "" && newNote.content === "") {
        navigate("/");
      } else {
        const toastId1 = toast.loading("creating...");
          await addNotes(userData.Token, newNote);
          toast.success('Created',{
            id:toastId1
          })
          navigate("/");
      }
    } else {
      navigate("/signin");
    }
  };
  
  

  return (
    <section className="flex justify-center">
      <div className="hidden lg:flex w-[15%]">
        <section>
          <FullSideBar userData={userData} />
        </section>
      </div>
      <div className="w-[100%] lg:w-[85%]">
        <NormalWrapper>
          <div className="m-4 lg:mt-2 sm:mx-16 md:mx-20 lg:mx-24 sm:mt-8">
            <form onSubmit={handleSubmit}>
              <section className="flex justify-between sm:hidden">
                <Link
                  to="/"
                  className="border-2 rounded-full p-1 mb-2 border-red-600 bg-red-600 text-white"
                >
                  <X />
                </Link>
                <button
                  type="submit"
                  className="border-2 rounded-full p-1 mb-2 border-blue-600 bg-blue-600 text-white"
                >
                  <Check />
                </button>
              </section>
              <section className="sm:flex justify-start gap-4 hidden">
                <Link
                  to="/"
                  className="rounded-md p-2 text-lg mb-2 bg-red-600 opacity-95 text-white"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-md p-2 text-lg mb-2 bg-blue-600 opacity-95 text-white"
                >
                  Create
                </button>
              </section>
              <section>
                <div>
                  <textarea
                    type="textarea"
                    name="title"
                    placeholder="Title"
                    maxLength={60}
                    value={newNote.title}
                    className="text-xl bg-blue-200 rounded-md w-full p-2 md:p-4 outline-none resize-none overflow-hidden font-semibold"
                    onKeyDown={handleDown}
                    onChange={handleChange}
                  />
                </div>
                <div className="h-[66vh]">
                  <textarea
                    placeholder="Content"
                    name="content"
                    value={newNote.content}
                    className="w-full bg-blue-100 rounded-md h-[65vh] text-lg p-2 md:p-4 outline-none resize-none overflow-auto"
                    onChange={handleChange}
                  />
                </div>
              </section>
            </form>
            <Toaster />
          </div>
        </NormalWrapper>
      </div>
    </section>
  );
}

export default CreateNotes;
