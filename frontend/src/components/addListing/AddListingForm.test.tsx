import React from 'react';
import { AddListingForm } from './AddListingForm';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { addListing } from '../../helpers/listingApiHelpers';
import AuthContext from '../../contexts/AuthContext';

const mockAuthContextValue = {
  authToken: 'mock-token',
  email: 'mock-email@example.com',
  setAuthToken: jest.fn(),
  logout: jest.fn(),
};

jest.mock('../../helpers/listingApiHelpers', () => ({
  addListing: jest.fn().mockResolvedValue({ listingId: 1212 }),
}));

describe('AddListingForm', () => {
  it('form renders', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AddListingForm />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText('Property title')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Property Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Price per night')).toBeInTheDocument();
    expect(screen.getByLabelText('Bedrooms')).toBeInTheDocument();
    expect(screen.getByLabelText('Beds')).toBeInTheDocument();
    expect(screen.getByLabelText('Bathrooms')).toBeInTheDocument();
    expect(screen.getByText('Amenities')).toBeInTheDocument();

    expect(screen.getByText('Add Property Photos')).toBeInTheDocument();
    expect(screen.getByText('Add Thumbnail')).toBeInTheDocument();

    const fileInputThumbnail = screen.getByLabelText('Add Thumbnail');
    expect(fileInputThumbnail).toBeInTheDocument();
    expect(fileInputThumbnail).toHaveAttribute('type', 'file');

    const file = new File([''], 'thumbnail.png', { type: 'image/png' });
    fireEvent.change(fileInputThumbnail, { target: { files: [file] } });

    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('form submit', () => {
    render(<AddListingForm />);
    fireEvent.change(screen.getByLabelText('Property title'), {
      target: { value: 'Amazing Villa' },
    });
    fireEvent.change(screen.getByLabelText('Street'), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Coolcity' },
    });
    fireEvent.change(screen.getByLabelText('State'), {
      target: { value: 'Coolstate' },
    });
    fireEvent.change(screen.getByLabelText('Postcode'), {
      target: { value: '2222' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'Austria' },
    });

    expect(screen.getByLabelText('Property title')).toHaveValue('Amazing Villa');
    expect(screen.getByLabelText('Street')).toHaveValue('123 Main St');
    expect(screen.getByLabelText('City')).toHaveValue('Coolcity');
    expect(screen.getByLabelText('State')).toHaveValue('Coolstate');
    expect(screen.getByLabelText('Postcode')).toHaveValue('2222');
    expect(screen.getByLabelText('Country')).toHaveValue('Austria');

    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(addListing).toHaveBeenCalled();
  });
})
