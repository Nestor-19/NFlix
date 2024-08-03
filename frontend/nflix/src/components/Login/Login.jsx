import React, { useState, useContext } from 'react';
import './Login.scss';
import api from '../../api/axiosConfig';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',   
  });

  const { login } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
        const response = await api.post('/api/v1/auth/login', { username: form.username, password: form.password });
        console.log(response);
        if (response.status === 200) {
          const user = response.data.user;
          login(user);
          setSuccessMessage('User logged in successfully.');
          setForm({
            username: '',
            password: '',
          });
        }
    } catch(error) {
        console.log(error);
        setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>} 
        <label>
          Username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
