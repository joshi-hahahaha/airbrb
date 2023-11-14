// import { useContext } from 'react';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import { apiCall } from './apiHelper';
// import AuthContext from '../contexts/AuthContext';
import {
  AddListingRes,
  AvailabilityAdd,
  EditListingFormData,
  DeleteListingRes,
  EditListingRes,
  Listing,
  ListingsRes,
  NewListingFormData,
} from '../interfaces/listingInterfaces';

export const getListings = async (
  authToken: string | null
): Promise<ListingsRes> => {
  const path: string = '/listings';
  const method: HttpMethod = 'GET';
  const body: null = null;
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<ListingsRes> = await apiCall<ListingsRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    // console.log(res.error);
  } else if (res.data) {
    return res.data;
  } else {
    // console.log('Unexpected response structure:', res);
  }

  return { listings: [] };
};

export const getListing = async (
  authToken: string | null,
  id: number | undefined
) => {
  const path: string = `/listings/${id}`;
  const method: HttpMethod = 'GET';
  const body: null = null;
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<{ listing: Listing }> = await apiCall<{
    listing: Listing;
  }>(path, method, body, token, queryStr);

  // console.log(res);

  if (res.error) {
    // console.log(res.error);
  } else if (res.data && res.data.listing) {
    return res.data.listing;
  } else {
    // console.log('Unexpected response structure:', res);
  }
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

  // console.log(body);

  const res: ApiResponse<AddListingRes> = await apiCall<AddListingRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    // console.log(res.error);
  } else if (res.data) {
    // console.log(res.data);
    return res.data;
  } else {
    // console.log('Unexpected response structure:', res);
  }
};

export const editListing = async (
  authToken: string | null,
  listingId: number,
  formData: EditListingFormData
) => {
  const path: string = `/listings/${listingId}`;
  const method: HttpMethod = 'PUT';
  const body: EditListingFormData = { ...formData };
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<EditListingRes> = await apiCall<EditListingRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    // console.log(res.error)
  } else if (res.data) {
    return res.data;
  } else {
    // console.log('Unexpected response structure:', res);
  }
};

export const deleteListing = async (
  authToken: string | null,
  listingId: number
) => {
  const path: string = `/listings/${listingId}`;
  const method: HttpMethod = 'DELETE';
  const body: null = null;
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<DeleteListingRes> = await apiCall<DeleteListingRes>(
    path,
    method,
    body,
    token,
    queryStr
  );

  if (res.error) {
    // console.log(res.error)
  } else if (res.data) {
    return res.data;
  } else {
    // console.log('Unexpected response structure:', res);
  }
};

export const addAvailability = async (
  authToken: string | null,
  listingId: number,
  data: AvailabilityAdd
) => {
  const path: string = `/listings/publish/${listingId}`;
  const method: HttpMethod = 'PUT';
  const body: AvailabilityAdd = { ...data };
  const token: string | null = authToken;
  const queryStr: string | undefined = undefined;

  const res: ApiResponse<EditListingRes> = await apiCall<EditListingRes>(
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
