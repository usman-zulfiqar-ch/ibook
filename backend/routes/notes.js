const express = require('express')
const router = express.Router();
const Notes = require('../models /Notes')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const { route } = require('./auth');

// ROUTE:1  get or fetch all the notes by using : get request "api/auth/fetchallnotes" .login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }
})
// ROUTE:2 Add or push the notes in database by using : post request "/api/auth/addnotes"
router.post('/addnotes', fetchuser, [

    body('title', 'title cannot be empty').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })

], async (req, res) => {

    try {

        const { title, description, tag } = req.body; // by using desetructuring we can get email or passwor outside the body
        // there are erros so return bad request and erros ..
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // create new notes
        const note = await new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()

        res.json(savedNotes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }
})
// ROUTE:3 Update the existing notes of specific user by using put request: "/update-notes" ..login

router.put("/update-notes/:id", fetchuser, async (req , res)=>{
    try {
        const {title , description, tag} = req.body;
        // create a newnotes object 
        const newNote = {};
        if(title){newNote.title= title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //fidn the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send('Not found')};

        // here toString() method gives the id of the user (is note ki id)// also here we match the user id 
        if(note.user.toString() !== req.user.id){       
            return res.status(401).send('Not Allowed')
        }
        // here we update the notes 
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json(note)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }
})
// ROUTE:3 deleted the existing notes from the database by using delete request: "/delete-notes/:id"
router.delete("/delete-notes/:id", fetchuser, async (req , res)=>{
    try {

         //find the note to be deleted and delete it.
         let dnote = await Notes.findById(req.params.id);
         if(!dnote){ return res.status(404).send('Not found')};

         // here toString() method gives the id of the user (is note ki id)// also here we match the user id 
         // Allow deletion only if user owns this note
         if(dnote.user.toString() !== req.user.id){       
            return res.status(401).send('Not Allowed')
        };

          // here we update the notes 
          deleteNote = await Notes.findByIdAndDelete(req.params.id)
          res.json({'success':"your notes has been deleted..."})

        } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }
})

module.exports = router;