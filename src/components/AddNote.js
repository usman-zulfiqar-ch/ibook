import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote }= context;
    

//    here we write the usestate to create or add new note
  const [note, setNote] = useState({title:'', description:'', tag:''})

  const handleClick = (e)=>{
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
    //   when you write the note and click on add than add note dialoge is empty
      setNote({title:'', description:'', tag:'default'})
      props.showAlert('Added successfully','success')
  }

  const onChange = (e)=>{
      //   ...note tripple . is spread operation which means jo vallue ...note k andar hai wo rahy pr agy jo values agy hain  unko overwrite kr dena ya add
    //    [e.target.name]: e.target.value ---> is ka matlab jo change ho raha us ka name us ki value ho jaye
    setNote({...note, [e.target.name]: e.target.value })
  }
    return (
        <div className="container my-3">
            <h1>Add a Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    {/* here add value={note.title} like this i tiitle , desc and tag for 
                     this purpose --->   //   when you write the note and click on add than add note dialoge is empty} */}
                    <input type="text" className="form-control" id="title" name='title' value={note.title}  onChange={onChange} aria-describedby="emailHelp" />
    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description}   onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name='tag'  value={note.tag}  onChange={onChange} />
                </div>
               
                <button type="submit h-2" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote