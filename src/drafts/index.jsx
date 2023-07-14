import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.scss"


const Drafts = ({isAuthenticated}) => {

  const navigate = useNavigate();
  const [contents, setContents] = useState([])

  const getContents = async() => {
    try {
      const {data}= await axios.get(`http://localhost:3001/v1/customer/contents/draft`, {
        headers: {
          'Authorization': `Bearer ${isAuthenticated}`
        }
      })
      
      setContents(data)
  
      navigate(`/contents/draft`)
     } catch (error) {
      return error();
    }
  }


  useEffect(() => {
    getContents()
  },[])

  console.log(contents)
    return (
        <div className="container">
        {contents.length ? contents.map((i, idx) => {
              const {title, content, publicId} = i
            return<div className="card">
              <div className="card__body">
                <span className="tag tag-blue">Technology</span>
                <h4>{title}</h4>
                <div className="paragraph" name="content">{content}</div>
              </div>
              <div className="nav-button">
                  <button className="btn white-btn" id="loginBtn" onClick={()=> {
                    navigate(`/view?publicId=${publicId}`)
                  }}>View</button>
              </div>
        </div>}) :  'Sorry no content available'}
        </div>
    );
}

export default Drafts;