import { FC } from 'react';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { SearchBarProps } from './SearchBar.types';

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <header
      className="sticky top-0 left-0 z-[10] flex 
    justify-center items-center min-h-[64px] px-6 py-3
    text-xl bg-blue-600  shadow shadow-indigo-900"
    >
      <SearchForm onSearch={onSearch} />
    </header>
  );
};
