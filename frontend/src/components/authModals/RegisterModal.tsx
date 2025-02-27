import React, { useState, useContext } from 'react';
import { TextField, Button, Divider, Typography } from '@mui/material';
import { RegisterData } from '../../interfaces/registerInterfaces';
import { apiCall } from '../../helpers/apiHelper';
import { BaseAuthModal, BaseAuthModalProps } from '../BaseAuthModal';
import { ApiResponse, HttpMethod } from '../../interfaces/apiInterfaces';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { AlertPopUp, AlertPopUpProps, Severity } from '../AlertPopUp';

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
    confirmPassword: '',
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
        handleAlert(res.error, 'error', true);
      } else if (res.data) {
        // Handle successful res
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', formData.email);
        setAuthToken(
          localStorage.getItem('token'),
          localStorage.getItem('email')
        );
        navigate('/');
      } else {
        handleAlert('Unexpected response', 'error', true);
      }
    } else {
      handleAlert('Passwords do not match. Please try again.', 'error', true);
    }
  };

  return (
    <BaseAuthModal open={open} onClose={onClose} title='Register'>
      {
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Name'
              name='name'
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
              margin='normal'
              required
              fullWidth
              name='confirmPassword'
              label='ConfirmPassword'
              type='password'
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
          </form>
          <Divider />
          <Link style={{ textDecoration: 'none' }} to='/login'>
            <Typography sx={{ mt: 1, color: '#D33753' }} variant='subtitle1'>
              {'I have an account'}
            </Typography>
          </Link>
          <AlertPopUp
            message={alertData.message}
            severity={alertData.severity}
            show={alertData.show}
            onAlertClose={() => handleAlert('', 'error', false)}
          />
        </>
      }
    </BaseAuthModal>
  );
};

export default RegisterModal;
