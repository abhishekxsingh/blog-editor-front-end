import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import "./index.scss"


const List = () => {

  const navigate = useNavigate();
  const [contents, setContents] = useState([])
  const handleSubmit = async () => {
    try {
      const {headers: {"public-id": publicId}}= await axios.post('http://localhost:3001/content', {
      });
      window.location.href = `/editor?=${publicId}`
  
      navigate(`/editor?publicId=${publicId}`)
     } catch (error) {
      console.error(error);
    }
  };

  const getContents = async() => {
    try {

      const {data}= await axios.get(`http://localhost:3001/v1/customer/contents/posted`)

      setContents(data)
      // window.location.href = `/editor?=${publicId}`

     } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getContents()
  },[])

  console.log(contents)
    return (
        <div className="container">
        {contents.length ? contents.map((i, idx) => {
              const {title, content, publicId, image} = i
            return<div className="card">
            <div className="card__header">
              <img src={image} alt="card__image" className="card__image" width="360"/>
            </div>
              <div className="card__body">
                <span className="tag tag-blue">Technology</span>
                <h4>{title}</h4>
                <div className="paragraph" name="content">{parse(content)}</div>
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

export default List;