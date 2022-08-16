import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  // here we add the hardform data for front-end use
  const notesInitial = []

  //  here we create use class for notes which is we added in up stairs  
  const [notes, setNotes] = useState(notesInitial)

     // 0- ge all Notes 
  const getNotes = async () => {
    // todo api call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
       const json = await response.json();
       console.log(json);
       setNotes(json)
  }

  
  // 1- Add a Note 
  const addNote = async (title, description, tag) => {
    // todo api call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    const json = await response.json;
    console.log(json)
    // parses JSON response into native JavaScript objects
    // 
    console.log('adding a new node')
    const note = {
      "_id": "629df2a0d9d72001e99de9b7db",
      "user": "629df1f3d9d72001ede9b7d3",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-06-06T12:27:12.501Z",
      "__v": 0
    };
    //  we use concat functio which will give the new arry whaereas push() method update an array 
    setNotes(notes.concat(note))

  }

  // 2- Edit a Note
  // API CALL:
  const editNote = async (id, title, description, tag) => {
  // Default options are marked with *
    const response = await fetch(`${host}/api/notes/update-notes/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json =  response.json(); // parses JSON response into native JavaScript objects
     console.log(json);


    //  here we crate a new state for updating the nodes // JSON.parse is used to make the copy notes to newNotes.
    let newNotes = JSON.parse(JSON.stringify(notes))
     // EDIT in client side 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
      // it is very imp point --> notes[index].title = title;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }

    }

    setNotes(newNotes);
  }

  // 3-Delete a Note
  const deleteNote = async (id) => {
    // TODO API:
    const response = await fetch(`${host}/api/notes/delete-notes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        //  here we pas the value of saved token in the header 
        'auth-token': localStorage.getItem('token')
      },
    });
    const json =  response.json();
    console.log(json)
    
    console.log('Deleting the node by id' + id)

    //  filter method is used for deletion 
    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNote);

  }

  return (
    //  here we give the value of notes and setnotes to provider
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}} >

      {props.children}

    </NoteContext.Provider>
  )
}

export default NoteState;