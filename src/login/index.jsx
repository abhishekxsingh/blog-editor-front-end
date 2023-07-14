import axios from 'axios';
import React, { useEffect } from 'react';
import './main.scss' 
import { useNavigate } from 'react-router-dom';

const Login = ({isAuthenticated}) => {

  const navigate = useNavigate();

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
               const {data: {token}} = await axios.post("http://localhost:3001/v1/customer/login ", data)
               if(token) {
                localStorage.setItem('token', token)
                navigate("/contents/posted");
                }
            }
    }

    useEffect(()=> {
        if(isAuthenticated) {
            // navigate("/contents/posted");
        }
    })

    return (
 
        <form onSubmit={makeLogin} className="form-box">
            <div className="login-container" id="login">
                <div className="input-box">
                    <input type="text" className="input-field" placeholder="Email" name="email"/>
                </div>
                <div className="input-box">
                    <input type="password" className="input-field" placeholder="Password" name="password"/>
                </div>
                <div className="input-box">
                    <button  className="submit" value="Sign In">Login</button>
                </div>
            </div>
        </form>
    );
}

export default Login;