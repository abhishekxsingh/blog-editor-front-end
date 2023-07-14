/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from "react-router-dom";
import './index.scss';

const MyEditor = ({isAuthenticated}) =>  {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, isSubmittedSet] = useState(false);
  const navigate = useNavigate();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const publicId = params.get('publicId');

  const createDraft = async() => {

    if(publicId) {
      try {
        
        const {status, headers, data} = await axios.patch(`http://localhost:3001/v1/customer/content/${publicId}/update`, {
          content,
          title:title 
        },{
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        console.log(status, headers, data)

        if(status===201) {
          console.log('blog updated')
        }
        
        return true
      
      }catch(err) {
        console.log(err)
      }
    }

  }

useEffect( ()=>{
  
  const interval = setInterval(() => {
    createDraft()
  }, 5000);

  return ()=>{
    return clearInterval(interval)
  }
});

const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:3001/v1/customer/content', {
      content,
      title:title,
      status: 'submitted'
    },{
      headers: {
        // 'Authorization': localStorage.getItem('token')
        'Authorization': `Bearer ${isAuthenticated}`
      }
    });

    isSubmittedSet(true)
    //localStorage.removeItem('publicId')
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="my-editor-container">
      <main>
        {!isSubmitted ? <div>
          <div className="form__group field">
              <input type="input" className="form__field" placeholder="Article title" name="title" onChange={ (evt) => { setTitle(evt.target.value) } }required />
              <label for="title" className="form__label">Article title</label>
          </div>
        <div className="editor-wrapper">
          <CKEditor editor={ClassicEditor} onChange={ ( event, editor ) => { const data = editor.getData(); 
                        console.log(data);
                        setContent(data);
                    } }/>
        </div>
        <div className="publish-button">
                <button className="btn publish-btn" onClick={handleSubmit} id="loginBtn">Publish</button>
          </div>
        </div>:
         <div>
            <p>You post has been successfully posted!!!!!</p>
             <div className="nav-button">
                  <button className="btn white-btn" id="loginBtn" onClick={()=> {
                    navigate(`/view?publicId=${publicId}`)
                  }}>View</button>
              </div>
          </div>}
      </main>
      <footer className="footer">
        <p>&copy; 2023 My Blog</p>
      </footer>
    </div>
  );
}

export default MyEditor;