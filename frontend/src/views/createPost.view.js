import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

/**
 * Funxtion Create new post
 * @returns 
 */
function CreatePostView() {
  /**
   * Use Context Auth
   */
  const auth = useContext(AuthContext);

  /**
  * Set state
  */
  const [form, setForm] = useState({
    title: "",
    context: ""
  });

  /**
   * Set constants
   */
  const { loading, error, clearError, request } = useHttp();
  const message = useMessage();

  /**
   * UI Messages
   */
  useEffect(() => {
    message(error);
    clearError();
  }, [error, clearError, message]);

  /**
   * Set/Get values from form
   * @param {*} event 
   */
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  /**
   * Handler for register button
   */
  const addHandler = async () => {
    try {
      const data = await request('/api/post/create', 'PUT', {...form}, {
        'Authorization': `Bearer ${auth.token}`
      });

      message(data.message);
      window.location.href = `/post/${data.newPost._id}`;
    } catch (error) {
      
    }
  };

  return (
    <div className="create-post">
        <div className="row">
        <div className="col s6 offset-s3">
          <h1>Create Post</h1>

          <div className="card">
            <div className="card-content black-text">
              <span className="card-title">New Post</span>
              
              <div className="input-fields">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  className="validate"
                  onChange={changeHandler}
                />

                <label htmlFor="title">Title</label>
              </div>

              <br />

              <div className="input-fields">
                <textarea
                  id="context"
                  name="context"
                  placeholder="Enter context"
                  className="validate"
                  onChange={changeHandler}
                />

                <label htmlFor="context">Context</label>
              </div>
            </div>
          
            <div className="card-action">
              <button
                type="button"
                className="btn green darken-4"
                onClick={addHandler}
                disabled={loading}
              >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostView;
