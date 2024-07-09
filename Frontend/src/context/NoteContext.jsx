import React, { Children, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./Context";
import {toast,Toaster} from 'react-hot-toast'

export const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
  const [myNotes, setMyNotes] = useState(null);
  const [filterNotes,setFilterNotes] = useState(null);

  // Method-1 :  Fetch All Notes
  const allNotes = async (Token) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_NOTES_PATH+"/getAllNotes",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response.data);
      setMyNotes(response.data);
      setFilterNotes(response.data);
    } catch (err) {
      console.log("Error Occured : " + err.message);
    }
  };

  // Method-2 :  Add a Notes
  const addNotes = async (Token,Note) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_NOTES_PATH+"/createNotes",Note,{
          headers:{
            Authorization:`Bearer ${Token}`
          }
        }
      )
      console.log(response.data)
      setMyNotes(response.data)
      setFilterNotes(response.data)
    } catch (err) {
      console.log("Error Occured : " + err);
    }
  };

  // Method-3 :  Delete a Notes
  const deleteNotes = async (noteId,Token) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_NOTES_PATH}/deleteNotes/${noteId}`,{
          headers:{
            Authorization:`Bearer ${Token}`
          }
        })
        console.log(response.data)
        setMyNotes(response.data)
        setFilterNotes(response.data)
    } catch (err) {
      console.log("Error Occured : " + err);
    }
  };

  // Method-4 :  Update a Notes
  const updateNotes = async (noteId,Token,Note) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_NOTES_PATH}/updateNotes/${noteId}`,Note,{
        headers:{
          Authorization:`Bearer ${Token}`
        }
      })
      console.log(response.data)
      setMyNotes(response.data)
      setFilterNotes(response.data)
    } catch (err) {
      console.log("Error Occured : " + err);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        filterNotes,
        setFilterNotes,
        myNotes,
        addNotes,
        allNotes,
        updateNotes,
        deleteNotes,
      }}
    >
      {children}
      <Toaster/>
    </NoteContext.Provider>
  );
};
