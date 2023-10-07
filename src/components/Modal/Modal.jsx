import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="overlay open" onClick={this.props.onClose}>
        <div className="modal">
          <img src={this.props.imageSrc} alt="" />
        </div>
      </div>
    );
  }
}
