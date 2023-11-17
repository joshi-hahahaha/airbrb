import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { searchBar } from '../../styles/navbar/searchBarStyles';
import { Button, Slider, MenuItem, Menu } from '@mui/material';
import AuthContext from '../../contexts/AuthContext';
import { getListings, getListing } from '../../helpers/listingApiHelpers';
import { CustomError } from '../../classes/CustomError';
import {
  AlertPopUp,
  AlertPopUpProps,
  Severity,
} from '../../components/AlertPopUp';
import { useSearch } from '../../contexts/SearchContext';
import { Listing } from '../../interfaces/listingInterfaces';
import { DateRange } from '../../interfaces/bookingsInterfaces';
import { guestSlider } from '../../styles/navbar/guestMenuStyle';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const {
    searchText,
    bedrooms,
    dateRange,
    price,
    updateSearchText,
    updateBedrooms,
    updateDateRange,
    updatePrice,
    updateSearchResults
  } = useSearch();

  const [alertData, setAlertData] = useState<AlertPopUpProps>({
    show: false,
    message: '',
    severity: 'error',
  });

  const [bedroomsAnchorEl, setBedroomsAnchorEl] = useState<null | HTMLElement>(null);
  const [priceAnchorEl, setPriceAnchorEl] = useState<null | HTMLElement>(null);

  const handleAlert = (message: string, severity: Severity, show: boolean) => {
    setAlertData({ message, severity, show });
  };

  const { authToken } = useContext(AuthContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchText(event.target.value);
  };

  const handleBedroomRangeChange = (event: Event, newValue: number | number[]) => {
    updateBedrooms(newValue as number[]);
  };

  const handleStartDateChange = (newStartDate: string) => {
    updateDateRange({ ...dateRange, startDate: newStartDate });
  };

  const handleEndDateChange = (newEndDate: string) => {
    updateDateRange({ ...dateRange, endDate: newEndDate });
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    updatePrice(newValue as number[]);
  };

  const handleBedroomsClick = (event: React.MouseEvent<HTMLElement>) => {
    setBedroomsAnchorEl(event.currentTarget);
  };

  const handleBedroomsClose = () => {
    setBedroomsAnchorEl(null);
  };

  const handlePriceClick = (event: React.MouseEvent<HTMLElement>) => {
    setPriceAnchorEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setPriceAnchorEl(null);
  };

  const availabilityCheck = (listingData: Listing, dateRange: DateRange): boolean => {
    for (const availability of listingData.availability!) {
      const availabilityStart = new Date(availability.startDate);
      const availabilityEnd = new Date(availability.endDate);
      const rangeStart = new Date(dateRange.startDate);
      const rangeEnd = new Date(dateRange.endDate);

      if (availabilityStart <= rangeStart && availabilityEnd >= rangeEnd) {
        return true;
      }
    }

    return false;
  };

  const handleSearch = async () => {
    try {
      const data = await getListings(authToken);
      const filteredListings = [];

      for (const listing of data.listings) {
        const listingData = await getListing(authToken, listing.id);

        if (matchesSearchCriteria(listingData)) {
          filteredListings.push(listingData);
        }
      }

      updateSearchResults(filteredListings);
    } catch (error) {
      if (error instanceof CustomError) {
        handleAlert(error.message, 'error', true);
      }
    }

    navigate('/');
  };

  const matchesSearchCriteria = (listingData: Listing) => {
    return (
      // filter listings string, bedrooms and price
      (listingData.title.toLowerCase().includes(searchText.toLowerCase()) ||
       listingData.address.street.toLowerCase().includes(searchText.toLowerCase()) ||
       listingData.address.city.toLowerCase().includes(searchText.toLowerCase()) ||
       listingData.address.state.toLowerCase().includes(searchText.toLowerCase()) ||
       listingData.address.country.toLowerCase().includes(searchText.toLowerCase())
      ) &&
      listingData.metadata!.bedrooms >= bedrooms[0] &&
      listingData.metadata!.bedrooms <= bedrooms[1] &&
      availabilityCheck(listingData, dateRange) &&
      listingData.price >= price[0] &&
      listingData.price <= price[1]
    );
  };

  // Number of bedrooms (a minimum and maximum number of bedrooms, expressed either
  // via text fields or a slider)
  // Date range (two date fields) - only display bookings that are available for the
  // entire date range as inputted by the user.
  // Price (a minimum and maximum price, expressed either via text fields or a slider)
  // Review ratings:

  // Sort results from highest to lowest review rating or from lowest to highest review rating
  // If there is more than one listing with the same rating, their order does not matter

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
        <Button onClick={handleBedroomsClick}>Bedrooms</Button>
        <Menu
          anchorEl={bedroomsAnchorEl}
          open={Boolean(bedroomsAnchorEl)}
          onClose={handleBedroomsClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem style={guestSlider}>
            <Slider
              value={bedrooms}
              onChange={handleBedroomRangeChange}
              valueLabelDisplay="auto"
              defaultValue={100}
              min={1}
              max={100}
              step={1}
            />
          </MenuItem>
        </Menu>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            minDate={new Date()}
            value={dateRange.startDate ? new Date(dateRange.startDate) : null}
            onChange={(newValue) => {
              if (newValue !== null) {
                handleStartDateChange(newValue.toDateString());
              }
            }}
          />
          <DatePicker
            label="End Date"
            minDate={
              dateRange.startDate
                ? new Date(new Date(dateRange.startDate).getTime() + 86400000)
                : new Date()
            }
            value={dateRange.endDate ? new Date(dateRange.endDate) : null}
            onChange={(newValue) => {
              if (newValue !== null) {
                handleEndDateChange(newValue.toDateString());
              }
            }}
          />
        </LocalizationProvider>
        <Button onClick={handlePriceClick}>Price Range</Button>
        <Menu
          anchorEl={priceAnchorEl}
          open={Boolean(priceAnchorEl)}
          onClose={handlePriceClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem style={guestSlider}>
            <Slider
              value={price}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={100}
            />
          </MenuItem>
        </Menu>
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
