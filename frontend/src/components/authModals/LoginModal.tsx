import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Divider, Typography } from '@mui/material';
import { LoginData, LoginRes } from '../../interfaces/loginInterfaces';
import { apiCall } from '../../helpers/apiHelper';
import { BaseAuthModal, BaseAuthModalProps } from '../BaseAuthModal';
import { ApiResponse, HttpMethod } from '../../interfaces/apiInterfaces';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { AlertPopUp, AlertPopUpProps, Severity } from '../AlertPopUp';

const LoginModal: React.FC<BaseAuthModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

  useEffect(() => {
    console.log(alertData);
  });

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
      handleAlert(res.error, 'error', true);
      console.log(alertData);
    } else if (res.data) {
      // Handle successful res
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', formData.email);
      setAuthToken(
        localStorage.getItem('token'),
        localStorage.getItem('email')
      );
      navigate('/');
    } else {
      console.log('Unexpected response structure:', res);
    }
  };

  return (
    <BaseAuthModal open={open} onClose={onClose} title='Login'>
      {
        <>
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
          <Divider />
          <Link style={{ textDecoration: 'none' }} to='/register'>
            <Typography sx={{ mt: 1, color: '#D33753' }} variant='subtitle1'>
              {"Don't have an account?"}
            </Typography>
          </Link>
          <AlertPopUp
            message={alertData.message}
            severity={alertData.severity}
            show={alertData.show}
          />
        </>
      }
    </BaseAuthModal>
  );
};

export default LoginModal;
