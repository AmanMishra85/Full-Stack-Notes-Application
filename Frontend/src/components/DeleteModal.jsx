import toast from "react-hot-toast";
import { NoteContext } from "../context/NoteContext";
import { useContext, useEffect } from "react";


const DeleteModal = ({ noteId, closeMethod }) => {
  const { deleteNotes } = useContext(NoteContext);

  useEffect(()=>{
    document.body.style.overflowY="hidden";
    return ()=>{
        document.body.style.overflowY="scroll";
    }
  },[])

  const deleteNote = async(e) => {
    if (localStorage.getItem("userData")) {
      e.preventDefault();
      const userData = JSON.parse(localStorage.getItem("userData"));
      if(userData){
        const toastId3 = toast.loading('deleting...');
          await deleteNotes(noteId, userData.Token);
          toast.success('Deleted',{
            id:toastId3
          })
          closeMethod();
      }
    } else {
      navigate("/signin");
    }
  };

  return (
      <div>
      <div
        className="fixed top-0 left-0 bottom-0 right-0"
        style={{ backgroundColor: "rgba(190,190,190,0.6)" }}
        onClick={closeMethod}
      ></div>
      <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-blue-600 opacity-85 text-white p-4 rounded-md w-[60%] sm:w-[50%] md:w-[40%] lg:w-[30%] h-36 sm:h-28 md:h-36 flex justify-center items-center">
        <section className="flex justify-center items-center flex-col gap-2">
          <p className="flex justify-center items-center mb-2 text-center md:text-lg">
            Are you sure you want to delete this note?
          </p>
          <section className="flex gap-8 sm:gap-12">
            <button className="bg-red-600 p-1 rounded-md lg:p-1 lg:text-lg" onClick={deleteNote}>
              Delete
            </button>
            <button
              className="bg-white text-blue-600 p-1 rounded-md lg:p-1 lg:text-lg"
              onClick={closeMethod}
            >
              Cancel
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default DeleteModal;
