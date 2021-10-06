import React from 'react';
import { useAuth } from '@/lib/auth';
import ModalContainer from '@/components/elements/modalContainer';

const Login: React.FC = () => {
  const { openSignIn, toggleSignInModal } = useAuth();

  return (
    <ModalContainer open={openSignIn} closeModal={() => toggleSignInModal(false)}>
      <span>Login Modal</span>
    </ModalContainer>
  );
};

export default Login;
