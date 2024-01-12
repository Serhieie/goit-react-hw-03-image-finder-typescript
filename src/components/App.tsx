import React, { Component } from 'react';
import { Loader } from 'helpers/loader';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGalery } from './ImageGalery/ImageGalery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import * as API from '../services/apiService';
import {
  succesToastCall,
  toastCallOutOfRange,
  toastCallEmpty,
} from '../helpers/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GaleryItemProps } from './ImageGalleryItem/ImageGaleryItem.types';

interface AppState {
  page: number;
  isLoading: boolean;
  images: GaleryItemProps[];
  searchValue: string;
  pagination: number;
  heightToMinus: number;
  error: boolean;
}

export class App extends Component<{}, AppState> {
  state = {
    page: 0,
    isLoading: false,
    images: [],
    searchValue: '',
    pagination: 9,
    heightToMinus: 120,
    error: false,
  };

  //Call scrollBottom function after images loaded by pressing load more button
  componentDidUpdate(prevProps: any, prevState: AppState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchValue !== this.state.searchValue
    ) {
      if (!this.state.page) {
        this.setState({
          isLoading: false,
          page: 0,
        });
        return;
      }
      this.loadImages();
    }
    if (prevState.images !== this.state.images) {
      this.scrollBottom();
    }
  }

  //Fetching images by pressing load more button
  loadImages = async () => {
    const { page, searchValue, pagination, images } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await API.getImgs(searchValue, page, pagination);
      const updatedImages = [...images, ...response.hits];
      if (!response.hits.length) {
        this.setState({
          page: 0,
        });
        toastCallEmpty();
      } else {
        this.setState({
          images: updatedImages,
        });
        succesToastCall();
      }
    } catch (error) {
      this.setState({ error: true });
      toastCallOutOfRange();
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleFormChange = (value: string): void => {
    this.setState({
      searchValue: value,
      page: 1,
    });
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  //Next three Functions - experiment with pagination
  // bigger screen more images will fetch also calculating
  // how many pixels need to minus for better experience of use
  // **********************************************************
  //better to check li height
  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  handleWindowResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1980) {
      this.setState({ pagination: 16 });
    } else if (windowWidth >= 1480) {
      this.setState({ pagination: 12, heightToMinus: 145 });
    } else if (windowWidth <= 768) {
      this.setState({ pagination: 10, heightToMinus: 640 });
    } else if (windowWidth >= 768) {
      this.setState({ pagination: 12, heightToMinus: 395 });
    } else {
      this.setState({ pagination: 9, heightToMinus: 120 });
    }
  };

  //Function witch taking heights,  calculating  and  scrolling to the needed point
  scrollBottom = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 520) {
      return;
    }
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollableDistance =
      pageHeight - windowHeight - this.state.heightToMinus;
    if (scrollableDistance > 0) {
      window.scrollTo({
        top: scrollableDistance,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { page, isLoading, images, error } = this.state;
    return (
      <>
        <SearchBar onSearch={this.handleFormChange} />
        <ToastContainer />
        <ImageGalery images={images} />

        {/* Showing loader when loading in state */}
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-40 flex justify-center items-center z-30">
            <Loader />
          </div>
        ) : (
          // showing button after form submission ( at form submission we are giving +1 for the page)
          page >= 1 && (
            <LoadMoreButton onClick={this.handleClick} error={error} />
          )
        )}
      </>
    );
  }
}
