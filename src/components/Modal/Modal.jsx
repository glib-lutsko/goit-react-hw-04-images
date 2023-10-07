import { useEffect } from 'react';

export const Modal = ({ onClose, imageSrc }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="overlay open" onClick={onClose}>
      <div className="modal">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  );
};
