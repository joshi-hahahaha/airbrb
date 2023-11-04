export interface LoginData {
  email: string;
  password: string;
}

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}
