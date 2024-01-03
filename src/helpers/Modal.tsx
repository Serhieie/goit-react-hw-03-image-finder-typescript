import { Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.querySelector('#modal__root');

export default class Modal extends Component<ModalProps> {
  componentDidMount(): void {
    window.addEventListener('keydown', this.handelKeydown);
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handelKeydown);
  };

  handelKeydown = (evt: KeyboardEvent): void => {
    if (evt.code === 'Escape') {
      return this.props.onClose();
    }
  };

  handleBackdropClick = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (evt.currentTarget === evt.target) {
      return this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-80 flex justify-center items-center z-30"
        onClick={this.handleBackdropClick}
      >
        <div className=" bg-opacity-70 rounded max-w-[90%] md:max-w-[720px] p-2 overflow-auto">
          {this.props.children}
        </div>
      </div>,
      modalRoot as Element
    );
  }
}
