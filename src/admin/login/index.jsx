import axios from 'axios';
import React from 'react';
// import "./main.scss";

const Login = () => {
    
    const makeLogin = async (evt) => {
        if ( evt && evt.preventDefault) {
            evt.preventDefault()   
        }

        const formData = new FormData (evt.target);

        const data = {}
          for (const [key, value] of formData) {
            console.log(key, value)
            data[key] = value;
          }
          if (data) {
               const result = await axios.post("http://localhost:3001/v1/admin/login", data)
               if(result) {
                //    window.location.href ="/"
                }
            }
    }
    return (
        <div className="login-box">
            <h2>Welcome back</h2>
            <p>Enter your details</p>
            <form onSubmit={makeLogin}>
                <div className="form-group">
                    <label for="email">Email</label>
                    <i className="fa-solid fa-user"></i>
                    <input type="email" id="email" placeholder="email" name="email" required />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" id="password" placeholder="Your password" name="password" required />
                </div>
                <button className="btn" type='submit'>Log In</button>
            </form>
            <div>
            </div>
            <div>
                <a href="/" className="forgot">
                    Forgot Your Password?
                </a>
            </div>
        </div>
    );
}

export default Login;