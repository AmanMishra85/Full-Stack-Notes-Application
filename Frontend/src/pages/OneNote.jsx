import React, { useContext, useEffect, useRef, useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X, Check, PenSquareIcon } from "lucide-react";
import NormalWrapper from "../NormalWrapper";
import { NoteContext } from "../context/NoteContext";
import FullSideBar from "../components/FullSideBar";
import { UserContext } from "../context/Context";

function OneNote() {
  const { updateNotes } = useContext(NoteContext);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const oldTitle = state.data.title;
  const oldContent = state.data.content;
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [newNote, setNewNote] = useState({
    title: oldTitle,
    content: oldContent,
  });

  const inputFieldRef = useRef();

  useEffect(() => {
    if (!isReadOnly && inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
  }, [isReadOnly]);

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
    e.preventDefault();
    if (!isReadOnly) {
      if (localStorage.getItem("userData")) {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (newNote.title === "" && newNote.content === "") {
          navigate("/");
        } else {
          const toastId2 = toast.loading("updating...");
            await updateNotes(state.data.noteId, userData.Token, newNote);
            toast.success("Updated", {
              id: toastId2,
            });
            navigate("/");
        }
      } else {
        navigate("/signin");
      }
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  };

  return (
    <section className="flex justify-center">
      <div className="hidden lg:flex w-[15%]">
        <section>
          <FullSideBar userData={userData} />
        </section>
      </div>
      <div className="lg:w-[85%] w-[100%]">
        <NormalWrapper>
          <div className="m-4 lg:mt-2 sm:mx-16 md:mx-20 lg:mx-24 sm:mt-8">
            <form onSubmit={handleSubmit}>
              <div>
                <section className="flex justify-between sm:hidden">
                  <Link
                    to="/"
                    className="border-2 rounded-full p-2 mb-2 border-red-600  bg-red-600 text-white"
                  >
                    <X />
                  </Link>
                  <button
                    type="submit"
                    className="border-2 rounded-full p-1 mb-2 border-blue-600 bg-blue-600 text-white"
                  >
                    {isReadOnly ? (
                      <div className="flex gap-1 p-1">
                        Edit <PenSquareIcon size={23} />
                      </div>
                    ) : (
                      <div className="flex gap-1 p-1">
                        Save <Check size={23} />
                      </div>
                    )}
                  </button>
                </section>
                <section className="sm:flex justify-start gap-4 hidden ">
                  <Link
                    to="/"
                    className="border-2 opacity-95 rounded-md p-2 mb-2 border-red-600  bg-red-600 text-white"
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    className="border-2 rounded-md p-1 mb-2 border-blue-600 bg-blue-600 opacity-95 text-white"
                  >
                    {isReadOnly ? (
                      <div className="flex gap-1 p-1">
                        Edit <PenSquareIcon size={23} />
                      </div>
                    ) : (
                      <div className="flex gap-1 p-1">
                        Save <Check size={23} />
                      </div>
                    )}
                  </button>
                </section>
              </div>
              <section>
                <div>
                  <textarea
                    ref={inputFieldRef}
                    type="textarea"
                    name="title"
                    placeholder="Title"
                    maxLength={60}
                    value={newNote.title}
                    className="text-xl bg-blue-200 md:p-4 rounded-md w-full p-2 outline-none resize-none overflow-hidden font-semibold"
                    onKeyDown={handleDown}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="h-[66vh] bg-blue-100 rounded-md">
                  <textarea
                    ref={inputFieldRef}
                    placeholder="Content"
                    name="content"
                    value={newNote.content}
                    className="w-full h-[65vh] bg-blue-100 md:p-4 text-lg p-2 outline-none resize-none overflow-auto"
                    onChange={handleChange}
                    readOnly={isReadOnly}
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

export default OneNote;
