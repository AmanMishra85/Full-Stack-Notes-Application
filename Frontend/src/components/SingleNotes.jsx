import React, { useContext, useState } from "react";
import { Pen, Trash2Icon, PenSquareIcon, Notebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import NoteB from "../Images/note_b.png";

function SingleNotes({ title, content, date, noteId }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const closeOpenModel = (e) => {
    setOpenModal(false);
  };

  const handleView = (e) => {
    navigate("/oneNote", {
      state: { from: "singleNotes", data: { noteId, title, content } },
    });
  };

  return (
    <div>
      {openModal && (
        <DeleteModal noteId={noteId} closeMethod={closeOpenModel} />
      )}
      <div className="bg-opacity-25 bg-amber-400 p-4 m-1 sm:m-2 lg:m-3 flex justify-center flex-col rounded-md shadow-sm hover:shadow-xl">
        <div onClick={handleView} className="cursor-pointer">
          <div className="flex justify-start items-center gap-2">
            <section className="w-10 flex items-end">
              <img src={NoteB} />
            </section>
            <section className="text-xl text-blue-600">
              {title.substring(0, 30) + "..."}
            </section>
          </div>
          <section className="">{content.substring(0, 25) + "..."}</section>
        </div>
        <section className="flex justify-between text-gray-600">
          <div className="text-sm font-semibold text-[12px] flex fl">
            {new Date(date).getDay() == new Date().getDay() ? (
              new Date(date).getHours() == new Date().getHours() ? (
                new Date(date).getMinutes() == new Date().getMinutes() ? (
                  <p>Just Now</p>
                ) : (
                  <p>Few minutes ago</p>
                )
              ) : (
                <div>
                {/* <p>{new Date(date).toLocaleTimeString()}</p> */}
                <p>Today</p>
                </div>
              )
            ) : (
              <p>{`${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getFullYear()}`}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="cursor-pointer hover:text-gray-600"
              onClick={() => setOpenModal(true)}
            >
              <Trash2Icon size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default React.memo(SingleNotes);
