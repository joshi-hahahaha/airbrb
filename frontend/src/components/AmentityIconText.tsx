import React from 'react';
import { Amenity } from '../interfaces/listingInterfaces';
import { Typography } from '@mui/material';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';

interface AmentityIconTextProps {
  amenity: Amenity;
}

export const AmentityIconText: React.FC<AmentityIconTextProps> = ({
  amenity,
}) => {
  return (
    <Typography
      style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}
    >
      {amenity === 'Swimming Pool' && <PoolIcon />}
      {amenity === 'Gym' && <FitnessCenterIcon />}
      {amenity === 'Parking' && <LocalParkingIcon />}
      {amenity === 'WiFi' && <WifiIcon />}
      {amenity === 'Air Conditioning' && <AcUnitIcon />}
      {amenity}
    </Typography>
  );
};
