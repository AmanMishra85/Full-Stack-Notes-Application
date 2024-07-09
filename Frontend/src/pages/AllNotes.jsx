import React, { useContext, useEffect, useState } from "react";
import SingleNotes from "../components/SingleNotes";
import { PackageOpen, CirclePlus, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NoteContext } from "../context/NoteContext";
import NormalWrapper from "../NormalWrapper";
import MyLoader from "../components/MyLoader";
import FullSideBar from "../components/FullSideBar";
import { UserContext } from "../context/Context";
import Empty from "../Images/empty.jpg";
import { motion } from "framer-motion";

function AllNotes() {
  const { myNotes, allNotes, filterNotes, setFilterNotes } =
    useContext(NoteContext);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchBar, setSearchBar] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      allNotes(userData.Token);
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const response = myNotes.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    if (value.length === 0) {
      setFilterNotes(myNotes);
    } else {
      if (response.length === 0) {
        setFilterNotes(response);
      } else {
        setFilterNotes(response);
      }
    }
  };

  const handleSearchBar = (e) => {
    setSearchBar(!searchBar);
    setFilterNotes(myNotes);
  };

  return (
    <section className="flex justify-center">
      <div className="hidden lg:flex w-[15%]">
        <section>
          <FullSideBar userData={userData} />
        </section>
      </div>

      <div className="lg:w-[85%] sm:w-[90%]">
        <NormalWrapper>
          <div className="mx-4 sm:mx-16 lg:mx-24">
            <section className="text-3xl my-2 lg:my-4 font-semibold text-slate-700 flex justify-between items-center">
              <p>All Notes</p>
              <section>
                {myNotes && myNotes.length != 0 && (
                  <div className="hidden text-sm md:flex justify-center items-center border-2 border-blue-500 rounded-md lg:w-[30vw] pl-1 w-[25vw]">
                    <Search size={20} className="text-gray-400" />
                    <input
                      type="text"
                      onChange={handleSearchChange}
                      className="outline-none w-full p-1"
                      maxLength={59}
                      placeholder="Search Notes by Title..."
                    />
                  </div>
                )}
              </section>
              {myNotes && myNotes.length > 0 && (
                <div>
                  <button
                    className="md:hidden mt-2 text-lg flex justify-center items-center"
                    onClick={handleSearchBar}
                  >
                    {searchBar ? <X /> : <Search />}
                  </button>
                  <Link
                    className="md:flex hidden justify-center items-center text-lg text-blue-600 gap-1 font-semibold"
                    to="/create"
                  >
                    <CirclePlus />
                    <p>Add new Note</p>
                  </Link>
                </div>
              )}
            </section>
            <section>
              {searchBar && (
                <div className="md:hidden my-2 mx-1">
                  <input
                    type="text"
                    onChange={handleSearchChange}
                    className=" outline-none w-full p-1 border-2 border-blue-400 rounded-lg"
                    maxLength={59}
                    placeholder="Search Notes by Title..."
                  />
                </div>
              )}
            </section>
            <section>
              {myNotes && myNotes.length > 0 && filterNotes && filterNotes.length == 0 && (
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl animate-bounce text-center mt-8 text-gray-500">
                    No Such Notes!
                  </h2>
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696455.jpg?t=st=1720377610~exp=1720381210~hmac=015ded3a32ce0ea3a72b81e7f8825d556a996031a7236566023a87c8b30e0249&w=740"
                    className="text-gray-600 w-[84vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] "
                  />
                </div>
              )}
            </section>
            {myNotes ? (
              <div>
                {myNotes.length > 0 ? (
                  <section className="flex flex-col items-center sm:flex-row md:justify-around lg:justify-start flex-wrap">
                    {filterNotes.map((item, index) => (
                      <div
                        key={index}
                        className="w-[80vw] md:w-[35vw] lg:w-1/3"
                      >
                        <SingleNotes
                          title={
                            item.title.length == 0
                              ? "UnTitled Note"
                              : item.title
                          }
                          content={item.content}
                          date={item.date}
                          noteId={item._id}
                        />
                      </div>
                    ))}
                  </section>
                ) : (
                  <div className="p-4 h-[70vh] flex justify-start mt-[10vh] md:mt-0 items-center flex-col">
                    <img
                      src={Empty}
                      className="text-gray-600 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] "
                    />
                    <h2 className="text-2xl animate-bounce text-gray-500">
                      Oops! No Notes Found.
                    </h2>

                    <Link
                      className="animate mt-4 p-2 bg-blue-500 lg:w-[20vw] shadow-lg flex justify-center text-white rounded-lg text-lg lg:text-xl"
                      to="/create"
                    >
                      Create First Note
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <MyLoader />
              </div>
            )}
          </div>
          <div className="fixed top-[80%] right-2 sm:top-[80vh] sm:right-8 md:hidden">
            {myNotes && myNotes.length > 0 && (
              <Link
                className="mt-8 font-normal text-6xl bg-blue-500 flex justify-center items-center text-white rounded-full w-16 h-16"
                to="/create"
              >
                +
              </Link>
            )}
          </div>
        </NormalWrapper>
      </div>
    </section>
  );
}

export default AllNotes;
