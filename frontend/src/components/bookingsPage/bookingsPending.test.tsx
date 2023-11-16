import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingsPending from './bookingsPending';
import { handleBooking } from '../../helpers/bookingsApiHelper';
import { Listing } from '../../interfaces/listingInterfaces';
import { Booking } from '../../interfaces/bookingsInterfaces';
import AuthContext from '../../contexts/AuthContext';

jest.mock('../../helpers/bookingsApiHelper', () => ({
  handleBooking: jest.fn(),
}));

const mockAuthContextValue = {
  authToken: 'mock-token',
  email: 'mock-email@example.com',
  setAuthToken: jest.fn(),
  logout: jest.fn(),
};

describe('BookingsPending', () => {
  const mockBookings: Booking[] = [
    {
      id: 78204786,
      owner: '7@7',
      dateRange: {
        startDate: '2023-11-23T16:05:06.000Z',
        endDate: '2023-11-23T16:05:06.000Z'
      },
      totalPrice: 500,
      listingId: '56513315',
      status: 'pending'
    },
  ];

  const mockListing: Listing = {
    title: 'Oceanside Villa',
    owner: 'alina@unsw.edu.au',
    address: {
      street: 'st',
      city: 'city',
      state: 'state',
      postcode: '2222',
      country: 'country'
    },
    price: 350,
    thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    metadata: {
      amenities: [
        'Swimming Pool',
        'Gym',
        'Parking'
      ],
      photos: [''],
      propertyType: 'House',
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    reviews: [
      {
        rating: 4,
        reviewMsg: 'good'
      }
    ],
    availability: [
      {
        startDate: '2020-10-31T14:45:21.077Z',
        endDate: '2020-11-31T14:45:21.077Z'
      }
    ],
    published: true,
    postedOn: '2020-10-31T14:45:21.077Z'
  };

  it('renders pending bookings', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BookingsPending
          bookings={mockBookings}
          listing={mockListing}
          listingId={'101'}
          processedBookings={[]}
          setProcessedBookings={() => {}}
          handleBookingStatusChange={() => {}}
        />
      </AuthContext.Provider>
    );

    expect(screen.getByText('7@7 wants a stay')).toBeInTheDocument();
    // expect(screen.getByText('From ')).toBeInTheDocument();
    // expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    // expect(screen.getByText('To ')).toBeInTheDocument();
    // expect(screen.getByText('2023-01-05')).toBeInTheDocument();
    expect(screen.getByText('You\'ll make: $500 in total.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('handles booking requests', () => {
    render(
      <BookingsPending
        bookings={mockBookings}
        listing={mockListing}
        listingId={'101'}
        processedBookings={[]}
        setProcessedBookings={() => {}}
        handleBookingStatusChange={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(handleBooking).toHaveBeenCalledWith('mock-token', 78204786, 'accept');

    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(handleBooking).toHaveBeenCalledWith('mock-token', 78204786, 'decline');
  });
});
