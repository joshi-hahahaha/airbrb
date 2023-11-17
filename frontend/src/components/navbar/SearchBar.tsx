import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { searchBar } from '../../styles/navbar/searchBarStyles';
import { GuestMenu } from './GuestMenu';
import { DatePicker } from './DatePicker';
import { Button } from '@mui/material';
import AuthContext from '../../contexts/AuthContext';
import { getListings } from '../../helpers/listingApiHelpers';
import { CustomError } from '../../classes/CustomError';
import {
  AlertPopUp,
  AlertPopUpProps,
  Severity,
} from '../../components/AlertPopUp';
import { useSearch } from '../../contexts/SearchContext';

// Other form inputs should also exist that allow the user to search by:

// Number of bedrooms (a minimum and maximum number of bedrooms, expressed either
// via text fields or a slider)
// Date range (two date fields) - only display bookings that are available for the
// entire date range as inputted by the user.
// Price (a minimum and maximum price, expressed either via text fields or a slider)
// Review ratings:

// Sort results from highest to lowest review rating or from lowest to highest review rating
// If there is more than one listing with the same rating, their order does not matter

// The search section must have an associated search button that will action the search
// to reload the results given the new filters.

export const SearchBar: React.FC = () => {
  const { searchText, updateSearchText, updateSearchResults } = useSearch();

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

  const { authToken } = useContext(AuthContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchText(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await getListings(authToken);
      const filteredListings = data.listings.filter(listing =>
        listing.title.toLowerCase().includes(searchText.toLowerCase()) ||
        listing.address.street.toLowerCase().includes(searchText.toLowerCase()) ||
        listing.address.city.toLowerCase().includes(searchText.toLowerCase()) ||
        listing.address.state.toLowerCase().includes(searchText.toLowerCase()) ||
        listing.address.country.toLowerCase().includes(searchText.toLowerCase())
      );

      updateSearchResults(filteredListings);
    } catch (error) {
      if (error instanceof CustomError) {
        handleAlert(error.message, 'error', true);
      }
    }
  };

  return (
    <div>
      <AlertPopUp
        message={alertData.message}
        severity={alertData.severity}
        show={alertData.show}
        onAlertClose={() => handleAlert('', 'error', false)}
      />
      <div style={searchBar}>
        <TextField
          id='standard-basic'
          label='Search destinations'
          variant='standard'
          value={searchText}
          onChange={handleSearchChange}
        />
        <GuestMenu />
        <DatePicker />
        <Button
          variant='contained'
          color='primary'
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
