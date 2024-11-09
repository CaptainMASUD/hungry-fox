// src/Components/SignUP/SignUP.js

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { GiFox } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom'; // Ensure Link is imported

function SignUP() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Ensure username and password are provided
    if (!formData.username || !formData.password) {
      return setErrorMessage("Fill up all the fields");
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:12005/api/auth/register", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) { 
        return setErrorMessage(data.message || "An error occurred during sign-up");
      } else {
        setSuccessMessage("Sign up successful!");
        setFormData({ username: '', password: '' }); // Reset form
        // Navigate to the sign-in page after successful sign-up
        setTimeout(() => navigate('/sign-in'), 2000); // Delay navigation to show success message
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
            This website is built to see the updates of JatioShongShod's updates. 
            The JatioShongShod is basically a section of DIU batch 62.
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
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='ml-2'>Loading...</span>
                </>
              ) : 'Sign up'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5 '>
            <span>Have an account?</span>
            <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert className='mt-5' color='success'>
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUP;
