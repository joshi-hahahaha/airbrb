// import React, { useState } from 'react';
// import Logo from '../assets/airbrbLogo';
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoginData, LoginModalProps } from '../interfaces/loginInterface';
import { apiCall } from '../helpers/apiHelper';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

export interface LoginRes {
  data?: {
    token: string;
  };
  error?: {
    error: string;
  };
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
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
    console.log('Submitted data:', formData);

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
      console.error(res.error);
    } else if (res.data) {
      // Handle successful res
      console.log(res.data);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' component='h2'>
            Login
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
            label='Email Address'
            name='email'
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
      </Box>
    </Modal>
  );
};

export default LoginModal;
