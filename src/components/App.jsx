import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { searchPhoto } from './services/pixabey';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { BallTriangle } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    photos: null,
    page: 1,
    loading: false,
    searchingPhoto: '',
    showModal: false,
    selectedImageSrc: '',
  };

  openModal = imageSrc => {
    this.setState({
      showModal: true,
      selectedImageSrc: imageSrc,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImageSrc: '',
    });
  };

  onSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const searchingValue = e.target.elements.search.value;

    this.setState(
      { searchingPhoto: searchingValue, page: 1, photos: [] },
      () => {
        searchPhoto(searchingValue, this.state.page)
          .then(data =>
            this.setState(prevState => ({
              photos: [...prevState.photos, ...data.hits],
              page: prevState.page + 1,
            }))
          )
          .catch(er => console.log(er))
          .finally(() => this.setState({ loading: false }));
      }
    );
  };

  loadMore = () => {
    this.setState({ loading: true });

    searchPhoto(this.state.searchingPhoto, this.state.page)
      .then(data =>
        this.setState(prevState => ({
          photos: [...prevState.photos, ...data.hits],
          page: prevState.page + 1,
        }))
      )
      .catch(e => console.log(e))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { photos, loading, showModal, selectedImageSrc } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery photos={photos} openModal={this.openModal} />
        {photos && <Button loadMore={this.loadMore} />}
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
        {showModal && (
          <Modal imageSrc={selectedImageSrc} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
