import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useAuth } from "../hooks/auth.hook";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

/**
 * Auth function
 * @returns 
 */
function AuthView() {
  /**
   * Set state
   */
  const [form, setForm] = useState({
    login: "",
    password: ""
  });

  /**
   * Set constants
   */
  const { loading, error, clearError, request } = useHttp();
  const auth = useAuth(AuthContext);
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
   * Handler for login button
   */
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});

      auth.login(data.userId, data.token);
      window.location.reload();
    } catch (error) {
      
    }
  };

  /**
   * Handler for register button
   */
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});

      message(data.message);
    } catch (error) {
      
    }
  };

  /**
   * Return UI
   */
  return (
    <div className="auth">
      <div className="row">
        <div className="col s6 offset-s3">
          <h1>User Posts</h1>

          <div className="card">
            <div className="card-content black-text">
              <span className="card-title">Authorise</span>
              
              <div className="input-fields">
                <input
                  type="email"
                  id="login"
                  name="login"
                  placeholder="Enter login"
                  className="validate"
                  onChange={changeHandler}
                />

                <label htmlFor="login">Login</label>
              </div>

              <br />

              <div className="input-fields">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="validate"
                  onChange={changeHandler}
                />

                <label htmlFor="password">Password</label>
              </div>
            </div>
          
            <div className="card-action">
              <button
                type="button"
                className="btn green darken-4"
                onClick={loginHandler}
                disabled={loading}
              >Login</button>

              <button
                type="button"
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
              >Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthView;
