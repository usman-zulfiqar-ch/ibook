const express = require('express');
const User = require('../models /User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser')
const jwt = require('jsonwebtoken');
// secret key 
const JWT_SECRET = "Hello/its/a/secret/$key";  // it sis a secret key which is a string 

// ROUTE:1  crate a user using: Post "/api/auth/createuser".no login requried
router.post('/createuser', [
      // username must be an email
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  // email must be a email
  body('email','Enter a valid email ').isEmail(),
  // password must contans 5 characters 
  body('password', 'Enter a valid password').isLength({ min: 5 }),

],  async (req, res)=>{

  let success = false;
  // there are erros so return bad request and erros ..
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }
    // check whether the user with this email already exist
     try {
       let user = await User.findOne({email: req.body.email});
  
     if(user){
      return res.status(400).json({success, errors: 'sorry this email is already exits' });
     }
     // adding salt and password by using bcrypt
     const salt =  await bcrypt.genSalt(10);
     const secPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,     //  adding a passwod by using bcrypt 
      });

      // send data or user by user id 
      const data = {
        user:{
          id: user.id
        }
      }
      // jwt signin method 
      const authtoken = jwt.sign(data , JWT_SECRET);    
      success = true;
      res.json({success, authtoken})
      

      // catch erros 
    } catch (error) {
      console.log(err.message);
      res.status(500).send('some error occured');
       
    }
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      //   res.json({error:'please enter a unique email', message : err.message})}  
}) 
     // ROUTE:2 Authentication a user using: Post request "/api/auth/login".no login requried
     router.post('/login', [
     // email must be a email
     body('email','Enter a valid email ').isEmail(),
     body('password',' Password cannot be blank').exists(),
     

    ],  async (req, res)=>{

      let success = false;

      // there are erros so return bad request and erros ..
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email , password} = req.body;  // by using desetructuring we can get email or passwor outside the body
     try {
       let user = await User.findOne({email});
       if(!user){
         success = false;
         return res.status(400).json({error: "please try to login  correct credentials"})
       }
         
       const passwodCompare = await bcrypt.compare(password, user.password);
       if(!passwodCompare){
        //  here we add succes when we reccive the auth token and it will show sucess = true; otherwise show success = false;
         success = false;
        return res.status(400).json({ success , error: "please try to login with correct credentials"})
       }
         // send data or user by user id 
         const data = {
         user:{
          id: user.id
        }
       }
        // jwt signin method 
        const authtoken = jwt.sign(data , JWT_SECRET);    
        success = true;
        res.json({ success, authtoken})
        
     } catch (error) {
      console.error(error.message);
      res.status(500).send('internal server error');
     }
    })
    // ROUTE:3  Get user loggedin User datails using: Post request "api/auth/getuser". login required
    router.post('/getuser',fetchuser, async (req, res)=>{

       try {
         
         userid = req.user.id
         let user = await User.findById(userid).select('-password')
         res.send(user)
       } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
       }

     })
     module.exports = router;

