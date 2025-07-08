
import React from 'react';
import AuthContainer from '../components/Auth/AuthContainer';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  return (
    <AuthContainer
      isOpen={isOpen}
      onClose={onClose}
      mode={mode}
      onModeChange={onModeChange}
    />
  );
};

export default AuthModal;
