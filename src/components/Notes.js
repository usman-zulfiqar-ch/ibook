import React, { useContext, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote} = context;
  let navigate = useNavigate();
  useEffect(() => {
    //  hre we wirte a if fuction for examle if user not logged in so this fuction is rediret to the login page if loggedin so rediret in the home page 
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
        navigate('/login')
    }
  }, [])

  //    here we write the usestate to create or add new note
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "" , etitle:'', edescription:'', etag:'default'})

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
    
  }
  
  
// we use refClose for close the modal from click on update button .
  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    e.preventDefault();
    refClose.current.click();
    props.showAlert('Update successfully','success')
    
}

const onChange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value })
}

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>    
                  {/* here we add the value for by add this value these values will appear in update modal                  */}
                  <input type="text" className="form-control" id="etitle" name='etitle'  value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription}  onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tags</label>
                  <input type="text" className="form-control" id="etag" name='etag'  value={note.etag}  onChange={onChange} />
                </div>

              </form>


            </div>
            <div className="modal-footer">
              <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>



      <div className="row my-3 " >
        <h1 className='text-center border border-dark rounded-pill mx-2 my-3'>Your Notes</h1>
        {/* here we show a message if notes are empty */}
        <div className="container mx-2">
        {notes.lenght===0 && ' No Notes to display  '}
        </div>
        {/* here we are fetching the notes data */}
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} showAlert={props.showAlert}  updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes