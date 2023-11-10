export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface Review {}

type Ammenity =
  | 'Swimming Pool'
  | 'Gym'
  | 'Parking'
  | 'WiFi'
  | 'Air Conditioning';

interface Photo {}

interface Bedroom {
  beds: number;
}

type PropertyType = 'House' | 'Apartment' | 'Resort' | 'Mansion' | 'Hotel';

export interface Metadata {
  ammenities: Ammenity[];
  photos: Photo[];
  propertyType: PropertyType;
  bedrooms: Bedroom[];
  bathrooms: number;
}

interface Availability {}

export interface Listing {
  id?: number;
  title: string;
  owner: string;
  address: Address;
  thumbnail: string;
  price: number;
  reviews?: Review[];
  metaData?: Metadata;
  availability?: Availability;
  published?: boolean;
  postedOn?: Date;
}

export interface ListingRes {
  listings: Listing[];
}
