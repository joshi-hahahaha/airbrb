import React from 'react';
import { Listing } from '../interfaces/listingInterfaces';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const ListingCard: React.FC<Listing> = ({ ...props }) => {
  console.log(props);

  const handleCardClick = () => {
    console.log(`Card pressed: ${props.title}`);
  };

  return (
    <Card
      sx={{ maxWidth: 250, minWidth: 200, cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <CardMedia
        component='img'
        alt={props.title}
        height='100%'
        image={props.thumbnail}
        sx={{ borderRadius: '5px' }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body1' color='text.primary'>
          ${props.price} / night
        </Typography>
      </CardContent>
    </Card>
  );
  // <div style={card}>
  //   <div style={imageDiv}>
  //     <img src={props.thumbnail} alt={props.title} style={thumbnail} />
  //   </div>
  //   <div style={infoDiv}>
  //     <Typography gutterBottom variant='h5' component='div'>
  //       {props.title}
  //     </Typography>
  //     <div>price</div>
  //     <div>reviews</div>
  //   </div>
  // </div>
};

// // 定义属性类型
// interface ListingCardProps {
//   imageUrl: string;
//   title: string;
//   type: string;
//   price: number;
//   reviewsCount: number;
//   rating: number;
//   bedrooms: number;
//   onEdit?: () => void; // 可选的编辑回调函数
// }

// // 卡片组件
// const ListingCard: React.FC<ListingCardProps> = ({
//   imageUrl,
//   title,
//   type,
//   price,
//   reviewsCount,
//   rating,
//   bedrooms,
//   onEdit,
// }) => {
//   return (
//     <Card>
//       <CardActionArea>
//         <CardMedia component='img' height='140' image={imageUrl} alt={title} />
//         <CardContent>
//           <Typography gutterBottom variant='h5' component='div'>
//             {title}
//           </Typography>
//           <Typography variant='body2' color='text.secondary'>
//             {type} - {bedrooms} Bedrooms
//           </Typography>
//           <Typography variant='body1' color='text.primary'>
//             ${price} / night
//           </Typography>
//           <Typography variant='body2' color='text.secondary'>
//             {reviewsCount} Reviews - {rating} Stars
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions disableSpacing>
//         <Checkbox
//           icon={<FavoriteBorder />}
//           checkedIcon={<Favorite />}
//           name='checkedH'
//         />
//         {onEdit && (
//           <Box display='flex' flexGrow={1} justifyContent='flex-end'>
//             <Link component='button' variant='body2' onClick={onEdit}>
//               <EditIcon fontSize='small' /> Edit
//             </Link>
//           </Box>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default ListingCard;
