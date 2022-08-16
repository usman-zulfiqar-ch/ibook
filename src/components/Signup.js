import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
const Signup = (props) => {
  let  [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword:""})
  const navigate = useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const { name, email, password, cpassword} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email , password})
      });
      const json = await response.json();
      console.log(json)
      // if josn.success is true than redirect into the accout where all the notes are placed
      if(json.success){
        // save the token 
        localStorage.setItem('token', json.authtoken);
        // redirect 
        navigate('/');
        props.showAlert('Account created successfully','success')

      }
      else{
        props.showAlert('invalid authentication','type')
      }
}
const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value })
  }
  
  return (
    <>
      <div className="modal modal-signin position-static d-block  py-5" tabIndex="-1" role="dialog" id="modalSignin">
        <div className="modal-dialog bg-secondary" role="document">
          <div className="modal-content rounded-4 bg-secondary shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
               <h5 className="modal-title"></h5> 
              <h2 className="fw-bold mb-0">Sign up for free</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body bg-secondary p-5 pt-0">
              <form  onSubmit={handleSubmit}  >
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-3"  name='name' id="name" onChange={onChange} placeholder="Name"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control rounded-3" name='email' id="email" onChange={onChange} placeholder="name@example.com"/>
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control rounded-3" name='password' id="password" onChange={onChange} placeholder="Password"/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control rounded-3" name='cpassword' id="cpassword"  onChange={onChange} placeholder="Password"/>
                    <label htmlFor="cpassword"> Confirm Password</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign up</button>
                <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                <hr className="my-4"/>
                  <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                  <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                  <i className="fa-brands fa-twitter-square fa-2x mx-1" ></i> 
                    Sign up with Twitter
                  </button>
                  <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                  <i className="fa-brands fa-facebook fa-2x mx-1" ></i> 
                    Sign up with Facebook
                  </button>
                  <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                  <i className="fa-brands fa-github fa-2x mx-1" ></i> 
                    Sign up with GitHub
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup