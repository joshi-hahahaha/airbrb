import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RegisterData, RegisterModalProps } from '../interfaces/registerInterfaces';
import { apiCall } from '../helpers/apiHelper';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import modalStyle from '../styles/modalStyles';

interface RegisterRes {
  data?: {
    token: string;
  };
  error?: {
    error: string;
  };
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
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
    } else {
      console.log('Unexpected response structure:', res);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      components={{
        Backdrop
      }}
      componentsProps={{
        backdrop: { // Pass props to the backdrop slot
          timeout: 500,
        },
      }}
    >
      <Box sx={modalStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' component='h2'>
            Register
          </Typography>
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            label="Email"
            name="email"
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
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
