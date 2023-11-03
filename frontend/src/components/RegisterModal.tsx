// import React, { useState } from 'react';
import React, { useState } from 'react';
// import Logo from '../assets/airbrbLogo';
import { Modal, Box, Typography, TextField, Button, Backdrop } from '@mui/material';

// interface RegisterData {
//   username: string;
//   email: string;
//   password: string;
// }
interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

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

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted data:', formData);
    // TODO: Send formData to your backend or handle it accordingly.
  };
  // const [formData, setFormData] = useState<RegisterData>({
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Submitted data:', formData);
  //   // TODO: Send formData to your backend or handle it accordingly.
  // };

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
        <Typography variant="h6" component="h2">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
