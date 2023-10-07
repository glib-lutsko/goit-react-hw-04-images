import { useCallback, useEffect } from 'react';

export const Modal = ({ onClose, imageSrc }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="overlay open" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  );
};
