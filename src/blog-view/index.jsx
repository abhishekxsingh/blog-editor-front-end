import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import './index.scss'

const Blogview = () => {

   const navigate = useNavigate();

  const [content, setContent] = useState({title:'', content: ''})
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const publicId = params.get('publicId');
  console.log(publicId)

  const getContents = async() => {
    try {

      const {data}= await axios.get(`http://localhost:3001/v1/customer/content?publicId=${publicId}`)
      console.log(data)
      setContent(data)
      //window.location.href = `/editor?=${publicId}`
  
      navigate(`/view?publicId=${data.publicId}`)
     } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getContents()
  },[publicId])

  const {title, content: body, image} = content;
    return (
      <div className="container">
      <div className="card">
          <div className="card__header">
            <img src={image} alt="card__image" className="card__image" width="360"/>
          </div>
            <div className="card__body">
              <span className="tag tag-blue">Technology</span>
              <h4>{title}</h4>
              <div className="paragraph" name="content">{parse(body)}</div>
            </div>
      </div>
      </div>
      );
};

export default Blogview;