export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface Review {}

interface Metadata {}

export interface Listing {
  id: number;
  title: string;
  owner: string;
  address: Address;
  thumbnail: string;
  price: number;
  reviews: Review[];
}

export interface ListingRes {
  listings: Listing[];
}
