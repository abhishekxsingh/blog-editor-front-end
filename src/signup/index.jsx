import axios from 'axios';
import React from 'react';
import "./index.scss";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()
    const Create = async (evt) => {
        if ( evt && evt.preventDefault) {
            evt.preventDefault()   
        }

        const formData = new FormData(evt.target);

        const data = {}
          for (const [key, value] of formData) {
            console.log(key, value)
            data[key] = value;
          }

          console.log(data);
          if (data) {
            if(data.password===data.confirmPassword) {
                delete data.confirmPassword
               const result = await axios.post("http://localhost:3001/v1/customer/registration", data)
               if(result) {
                //    window.location.href ="/"
                   navigate("/")
                }
            }
          }
    }
    return (

        <form onSubmit={Create}>
            <div className="register-box">
            <div className="input">
                <div>
                <input type="text" className="input-field" placeholder="Name" name="name"/>
                </div>
                <div>
                <input type="email" className="input-field" placeholder="Email" name="email"/>
                </div>
                <div>
                <input type="text" className="input-field" placeholder="mobileNumber" name="mobileNumber"/>
                </div>
                <div>
                <input type="password" className="input-field" placeholder="Password" name="password" />
                </div>
                <div>
                <input type="password" className="input-field" placeholder="confirmpassword" name="confirmPassword" />
                </div>
                <i className="bx bx-envelope"></i>
            </div>
            <button className="submit">Create account</button>
            </div>
        </form>    
    );
}

export default Signup;
