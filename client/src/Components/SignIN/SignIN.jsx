// src/Components/SignIn/SignIn.js

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInError } from '../../Redux/UserSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GiFox } from "react-icons/gi";
import Cookies from 'js-cookie'; // Import js-cookie

function SignIn() {
  const [formData, setFormData] = useState({});
  const [errormessage, setErrorMessage] = useState(null);
  const [successmessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loading: reduxLoading, error: reduxError } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.username || !formData.password) {
      return setErrorMessage("Fill up all the fields");
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:12005/api/auth/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        return setErrorMessage(data.message || "An error occurred during sign-in");
      } else {
        dispatch(signInSuccess(data)); // Assuming success dispatch
        
        // Save the token and isAdmin in cookies
        Cookies.set('auth_token', data.token); // Assuming the token is in the 'token' field
        Cookies.set('isAdmin', data.isAdmin); // Assuming isAdmin is returned in the response

        navigate('/'); // Redirect to homepage or dashboard
        setSuccessMessage("Sign in successful!");
        setFormData({ username: '', password: '' });
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className='text-xl font-bold dark:text-white sm:text-3xl flex'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Hungry</span><GiFox className='mt-2'/> 
          </Link>
          <p className='text-sm mt-5'>
            This website is built to see the updates of JatioShongShong's updates.
            Sign in using your username and password.
          </p>
        </div>

        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput
                type='text'
                placeholder='username'
                id='username'
                value={formData.username || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                type='password'
                placeholder='password'
                id='password'
                value={formData.password || ''}
                onChange={handleChange}
                required
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading || reduxLoading}>
              {loading || reduxLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className='ml-2'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an Account?</span>
            <Link to="/sign-up" className='text-blue-500'>Sign Up</Link>
          </div>
          {reduxError && (
            <Alert className='mt-5' color='failure'>
              {reduxError}
            </Alert>
          )}
          {errormessage && (
            <Alert className='mt-5' color='failure'>
              {errormessage}
            </Alert>
          )}
          {successmessage && (
            <Alert className='mt-5' color='success'>
              {successmessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
