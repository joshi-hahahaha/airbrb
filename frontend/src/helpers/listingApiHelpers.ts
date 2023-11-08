// import { useContext } from 'react';
import { ApiResponse, HttpMethod } from '../interfaces/apiInterfaces';
import { apiCall } from './apiHelper';
// import AuthContext from '../contexts/AuthContext';
import { ListingRes } from '../interfaces/listingInterfaces';

export const getListings = async (
  authToken: string | null
): Promise<ListingRes> => {
  // const { authToken } = useContext(AuthContext);

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
