import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Listing } from '../interfaces/listingInterfaces';
import { DateRange } from '../interfaces/bookingsInterfaces';

// provide search query to all the components needed
interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextType {
  searchText: string;
  bedrooms: number[];
  dateRange: DateRange;
  price: number[];
  searchResults: Listing[] | undefined;
  updateSearchText: (text: string) => void;
  updateBedrooms: (range: number[]) => void;
  updateDateRange: (range: DateRange) => void;
  updatePrice: (range: number[]) => void;
  updateSearchResults: (results: Listing[]) => void;
  resetSearchResults: () => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchText: '',
  bedrooms: [1, 2],
  dateRange: {
    startDate: (new Date().toDateString()),
    endDate: (new Date().toDateString())
  },
  price: [0, 1000],
  searchResults: undefined,
  updateSearchText: () => {},
  updateBedrooms: () => {},
  updateDateRange: () => {},
  updatePrice: () => {},
  updateSearchResults: () => {},
  resetSearchResults: () => {}
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Listing[]>();
  const [searchText, setSearchText] = useState('');
  const [bedrooms, setBedrooms] = useState([1, 2]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: (new Date().toDateString()),
    endDate: (new Date().toDateString())
  });
  const [price, setPrice] = useState([0, 1000]);

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };

  const updateBedrooms = (range: number[]) => {
    setBedrooms(range);
  };

  const updateDateRange = (range: DateRange) => {
    setDateRange(range);
  }

  const updatePrice = (range: number[]) => {
    setPrice(range);
  }

  const updateSearchResults = (results: Listing[]) => {
    setSearchResults(results);
  };

  const resetSearchResults = () => {
    setSearchResults(undefined);
  };

  return (
    <SearchContext.Provider value={{
      searchText,
      bedrooms,
      dateRange,
      price,
      searchResults,
      updateSearchText,
      updateBedrooms,
      updateDateRange,
      updatePrice,
      updateSearchResults,
      resetSearchResults
    }}>
      {children}
    </SearchContext.Provider>
  );
};
