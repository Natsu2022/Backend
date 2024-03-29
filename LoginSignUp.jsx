import './LoginSignUp.css';
import wareVistaLogo from './WareHouseLOGO.png';
import React, {useState} from "react"; 
import axios from "axios"; 

export default function App() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  }); 

  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    // const { name, value } = event.target;
    setValues({...values, [event.target.name]: event.target.value,});
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (values.username && values.email && values.password) {
      setValid(true);
      console.log(values);
      axios.post("http://localhost:8000/register", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {!valid && (
          <input
          class="form-field"
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleInputChange}
          />
          )}

        {submitted && !values.username && (
          <span id="username-error">Please enter a username</span>
          )}

        {!valid && (
          <input
            class="form-field"
            type="text"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            />
            )}

        {submitted && !values.email && (
          <span id="email-error">Please enter a Email</span>
        )}

        {!valid && (
          <input
            class="form-field"
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            />
            )}

        {submitted && !values.password && (
          <span id="password-error">Please enter an password</span>
        )}
        {!valid && (
          <button class="form-field" type="submit">
            Register
          </button>
        )}
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.useName}{" "}
            </h3>
            <div> Your registration was successful! </div>
          </div>
        )}
      </form>
    </div>
  );
}
