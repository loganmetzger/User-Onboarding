import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './formSchema'
import UserForm from './UserForm'
import User from './User'

// Initial form values as empty strings of false for checkbox
const initialFormValues = {
  name: '', 
  email: '',
  password: '',
  terms: {
    accepted: false
  }
};

// Used for yup validation
const initialFormErrors = {
  name: '', 
  email: '',
  password: ''
};

// Empty array for users and keep disabled disabled for submit button
const initialUsers = [];
const initialDisabled = true;


function App() {
  // Let's set some state to our initial variables
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  // Network helper functions being declared, axios calls being made
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger
      })
  }

  // Form actions
  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

      setFormValues({
        ...formValues,
        [name]: value
      })
  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.accepted,
        [name]: isChecked,
      }
    })
  }

  const submit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms).filter(tm => formValues.terms[tm])
    }

    postNewUser(newUser)
  }

  // useEffect to start axios call on page load
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App">
      <header><h1>User Onboarding</h1></header>

      <UserForm 
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        users.map(user => {
          return (
            <User 
              key={user.id} details={user}
            />
          )
        })
      }
    </div>
  );
}

export default App;
