export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface Review {}

interface Ammenity {}

interface Photo {}

type PropertyType = 'House' | 'Apartment' | 'Resort' | 'Mansion' | 'Hotel';

interface Metadata {
  ammenities: Ammenity[];
  photos: Photo[];
  propertyType: PropertyType;
}

interface Availability {}

export interface Listing {
  id: number;
  title: string;
  owner: string;
  address: Address;
  thumbnail: string;
  price: number;
  reviews: Review[];
  metaData?: Metadata;
  availability?: Availability;
  published?: boolean;
  postedOn?: Date;
}

export interface ListingRes {
  listings: Listing[];
}
