import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Listing } from '../interfaces/listingInterfaces';

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextType {
  searchText: string;
  searchResults: Listing[] | undefined;
  updateSearchText: (text: string) => void;
  updateSearchResults: (results: Listing[]) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  searchResults: undefined,
  updateSearchText: () => {},
  updateSearchResults: () => {}
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Listing[]>();
  const [searchText, setSearchText] = useState('');

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };

  const updateSearchResults = (results: Listing[]) => {
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider value={{ searchText, searchResults, updateSearchText, updateSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
