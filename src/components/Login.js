import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  let [credentials, setCredentials] = useState({ email: "", password: "" })
  // we use the usehistory() {in new verisons useHistory is replaced by useNavigate} method for redirect
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    // if josn.success is true than redirect into the accout where all the notes are placed
    if (json.success) {
      // save the token 
      localStorage.setItem('token', json.authtoken);
      // redirect 
      props.showAlert('Login successfully', 'success')
      navigate('/');

    }
    else {
      props.showAlert('In Valid Authentication', 'danger')
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
        <form className="form-signin text-center my-4 " onSubmit={handleSubmit}>
          <i className="fa-solid fa-arrow-right-to-bracket fa-3x mb-4" ></i>
          <h1 className="h3 mb-3 font-weight-normal">Please Log in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="email" className="form-control my-2" placeholder='Email Address' name="email" value={credentials.email} onChange={onChange} required="" autoFocus="" />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="password" className="form-control my-2" placeholder='Password' name="password" value={credentials.password} onChange={onChange} required="" />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit"> Login</button>
          <p className="mt-5 mb-3 text-muted">©iNotebook</p>
        </form>
      

     </>
  )
}

export default Login