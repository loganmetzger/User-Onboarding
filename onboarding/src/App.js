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
}




function App() {
  return (
    <div className="App">
      <header><h1>User Onboarding</h1></header>

      <userForm 
        // props go here
      />
      {
        users.map(user => {
          return (
            <User 
              // props go here
            />
          )
        })
      }
    </div>
  );
}

export default App;
