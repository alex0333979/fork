import React, { useCallback } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    zIndex: 1000,
    backdropFilter: 'blur(2px)'
  }
};

interface ModalContainerProps {
  open: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ open, closeModal, children }) => {
  const afterOpenModal = useCallback(() => {
    console.log('========');
  }, []);

  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      bodyOpenClassName={'scroll-lock'}
      contentLabel="Example Modal">
      <h2>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
      {children}
    </Modal>
  );
};
export default ModalContainer;
