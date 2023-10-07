import { useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { searchPhoto } from './services/pixabey';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { BallTriangle } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchingPhoto, setSearchingPhoto] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');

  const openModal = imageSrc => {
    setShowModal(true);
    setSelectedImageSrc(imageSrc);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImageSrc('');
  };
  const onSubmit = e => {
    setPhotos([]);
    setPage(1);
    setLoading(true);

    e.preventDefault();
    const searchingValue = e.target.elements.search.value;

    searchPhoto(searchingValue, 1)
      .then(data => {
        setPhotos(prevPhotos => [...prevPhotos, ...data.hits]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
        setSearchingPhoto(searchingValue);
      });
  };

  const loadMore = () => {
    setLoading(true);

    searchPhoto(searchingPhoto, page)
      .then(data => {
        setPhotos(prevState => [...prevState, ...data.hits]);
        setPage(prevState => prevState + 1);
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery photos={photos} openModal={openModal} />
      {photos && <Button loadMore={loadMore} />}
      {loading && (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      )}
      {showModal && <Modal imageSrc={selectedImageSrc} onClose={closeModal} />}
    </>
  );
};
