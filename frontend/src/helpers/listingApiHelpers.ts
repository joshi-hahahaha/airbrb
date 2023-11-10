// import { useContext } from 'react';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import { apiCall } from './apiHelper';
// import AuthContext from '../contexts/AuthContext';
import {
  AddListingRes,
  ListingRes,
  NewListingFormData,
} from '../interfaces/listingInterfaces';

export const getListings = async (
  authToken: string | null
): Promise<ListingRes> => {
  const path: string = '/listings';
  const method: HttpMethod = 'GET';
  const body: null = null;
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<ListingRes> = await apiCall<ListingRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    console.log(res.error);
  } else if (res.data) {
    return res.data;
  } else {
    console.log('Unexpected response structure:', res);
  }

  return { listings: [] };
};

export const addListing = async (
  authToken: string | null,
  formData: NewListingFormData
) => {
  const path: string = '/listings/new';
  const method: HttpMethod = 'POST';
  const body: NewListingFormData = { ...formData };
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  console.log(body);

  const res: ApiResponse<AddListingRes> = await apiCall<AddListingRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    console.log(res.error);
  } else if (res.data) {
    console.log(res.data);
    return res.data;
  } else {
    console.log('Unexpected response structure:', res);
  }
};
