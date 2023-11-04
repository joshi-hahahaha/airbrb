export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}
