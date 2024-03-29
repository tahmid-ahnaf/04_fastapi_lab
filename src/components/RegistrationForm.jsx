import React, { useState } from 'react';
import axios from 'axios';
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Add your validation logic here
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Username validation: unique and more than five characters
    if (formData.username.length < 6) {
      errors.username = 'Username must be more than 5 characters.';
      formIsValid = false;
    }
    // TODO: Check the uniqueness of username against an API or database

    // Password validation: match confirm password and more than six characters
    if (formData.password.length < 7) {
      errors.password = 'Password must be more than 6 characters.';
      formIsValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      formIsValid = false;
    }

    // Email validation: unique
    // TODO: Check the uniqueness of email against an API or database

    // Phone number validation: unique and exactly 11 digits
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be exactly 11 digits.';
      formIsValid = false;
    }
    // TODO: Check the uniqueness of phone number against an API or database

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
        
        setIsValid(true);
        try {
            const response = await axios.post('http://localhost:8000/user', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                phonenumber: formData.phoneNumber 
            });
            setConfirmation(response.data.message); // This will log the response from the backend
        } catch (error) {
            console.error('Error while submitting form:', error);
        }
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
        {/* Email error will go here */}
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber}</p>
        )}
      </div>
      <div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Register
        </button>
        {isValid && <p>{confirmation}</p>}
      </div>

    </form>
  );
};

export default RegistrationForm;