import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    const { photos, openModal } = this.props;
    return (
      photos && (
        <ul>
          {photos.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              openModal={openModal}
            />
          ))}
        </ul>
      )
    );
  }
}
