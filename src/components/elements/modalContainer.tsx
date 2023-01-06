import React from 'react'
import Modal from 'react-modal'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    borderColor: '#FFFFFF',
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
    borderRadius: '8px',
    overflow: 'visible',
    maxWidth: '800px',
    padding: 0,
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: '#ebedf0bf',
    backdropFilter: 'blur(2px)',
  },
}

interface ModalContainerProps {
  title?: string
  label?: string
  open: boolean
  className?: string
  closeModal?: () => void
  children: React.ReactNode
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  label,
  open,
  className,
  closeModal,
  children,
}) => (
  <Modal
    isOpen={open}
    onRequestClose={closeModal}
    style={modalStyles}
    bodyOpenClassName={'scroll-lock'}
    contentLabel="Example Modal"
    ariaHideApp={false}>
    {closeModal && (
      <button className="modal-close-button" onClick={closeModal}>
        <span className="icon-close" />
      </button>
    )}
    {title ? (
      <div className="modal-header">
        <h2>{title}</h2>
        {label ? <p>{label}</p> : <></>}
      </div>
    ) : (
      <></>
    )}

    <div className={`modal-content ${className || ''}`}>{children}</div>
  </Modal>
)
export default ModalContainer
