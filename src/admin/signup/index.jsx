import axios from 'axios';
import React from 'react';
import "./index.scss";

const Signup = () => {

    const makeRegistration = async (evt) => {
        if ( evt && evt.preventDefault) {
            evt.preventDefault()   
        }

        const formData = new FormData (evt.target);

        const data = {}
          for (const [key, value] of formData) {
            console.log(key, value)
            data[key] = value;
          }

          console.log(data);
          if (data) {
            if(data.password===data.confirmPassword) {
                delete data.confirmPassword
               const result = await axios.post("http://localhost:3001/v1/admin/registration", data)
               if(result) {
                   window.location.href ="/login"
                }
            }
          }
    }
    return (
        <div className="login-box">
            <h2>Welcome back</h2>
            <p>Enter your details</p>
            <form onSubmit={makeRegistration}>
                <div className="form-group">
                    <label for="Name">Name</label>
                    <i className="fa-solid fa-user"></i>
                    <input type="Name" id="Name" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                    <label for="Email">Email</label>
                    <i className="fa-solid fa-user"></i>
                    <input type="text" id="Email" placeholder="Email" name="email" required />
                </div>
                <div className="form-group">
                    <label for="mobile number">Mobile number</label>
                    <i className="fa-solid fa-user"></i>
                    <input type="mobile number" id="mobile number" placeholder="Mobile number" name="mobileNumber" required />
                </div>
                <div className="form-group">
                    <label for="Password">Password</label>
                    <i className="fa-solid fa-lock"></i>
                    <input type="Password" id="Password" placeholder="Your Password" name="password" required />
                </div>
                <div className="form-group">
                    <label for="Confirmpassword">ConfirmPassword</label>
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" id="confirmpassword"  placeholder="Your Confirmpassword" name="confirmPassword" required />
                </div>
                <div>
                    <button className="btn" type ='submit'>Create account</button>
                </div>
            </form>
            <div>
                <a href="/" className="forgot">
                    Forgot Your Password?
                </a>
            </div>
        </div>
    );
}

export default Signup;
