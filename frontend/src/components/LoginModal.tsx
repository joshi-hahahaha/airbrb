import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { LoginData } from '../interfaces/loginInterfaces';
import { apiCall } from '../helpers/apiHelper';
import { BaseModal, BaseModalProps } from './BaseModal';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';

interface LoginRes {
  token: string;
}

const LoginModal: React.FC<BaseModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted login data:', formData);

    const path: string = '/user/auth/login';
    const method: HttpMethod = 'POST';
    const body: LoginData = {
      email: formData.email,
      password: formData.password,
    };
    const token: string | null = null;
    const queryString: string = '';

    const res: ApiResponse<LoginRes> = await apiCall<LoginRes>(
      path,
      method,
      body,
      token,
      queryString
    );

    if (res.error) {
      // Handle error res
      console.log(res.error);
    } else if (res.data) {
      // Handle successful res
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
    } else {
      console.log('Unexpected response structure:', res);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Login">
      {
        <form onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            type='email'
            value={formData.email}
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      }
    </BaseModal>
  );
};

export default LoginModal;
