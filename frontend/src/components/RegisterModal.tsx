import React, { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { RegisterData } from '../interfaces/registerInterfaces';
import { apiCall } from '../helpers/apiHelper';
import { BaseAuthModal, BaseAuthModalProps } from './BaseAuthModal';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface RegisterRes {
  token: string;
}

const RegisterModal: React.FC<BaseAuthModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted register data:', formData);

    const path: string = '/user/auth/register';
    const method: HttpMethod = 'POST';
    const body: RegisterData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
    };
    const token: string | null = null;
    const queryString: string = '';

    if (formData.password === formData.confirmPassword) {
      const res: ApiResponse<RegisterRes> = await apiCall<RegisterRes>(
        path,
        method,
        body,
        token,
        queryString
      );

      if (res.error) {
        // Handle error res
        console.error(res.error);
      } else if (res.data) {
        // Handle successful res
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setAuthToken(localStorage.getItem('token'));
        navigate('/');
      } else {
        console.log('Unexpected response structure:', res);
      }
    } else {
      console.log('passwords do not match');
    }
  };

  return (
    <BaseAuthModal open={open} onClose={onClose} title="Register">
      {
        <form onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            label="Email"
            name="email"
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="ConfirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Link to='/login'>I have an account</Link>
        </form>
      }
    </BaseAuthModal>
  );
};

export default RegisterModal;
