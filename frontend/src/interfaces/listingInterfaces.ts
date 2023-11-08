interface Address {}

interface Review {}

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
