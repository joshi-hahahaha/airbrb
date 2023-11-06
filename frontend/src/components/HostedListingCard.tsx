import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
  Typography,
  Link,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// 定义属性类型
interface ListingCardProps {
  imageUrl: string;
  title: string;
  type: string;
  price: number;
  reviewsCount: number;
  rating: number;
  bedrooms: number;
  onEdit?: () => void; // 可选的编辑回调函数
}

// 卡片组件
const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  title,
  type,
  price,
  reviewsCount,
  rating,
  bedrooms,
  onEdit,
}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type} - {bedrooms} Bedrooms
          </Typography>
          <Typography variant="body1" color="text.primary">
            ${price} / night
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reviewsCount} Reviews - {rating} Stars
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          name="checkedH"
        />
        {onEdit && (
          <Box display="flex" flexGrow={1} justifyContent="flex-end">
            <Link component="button" variant="body2" onClick={onEdit}>
              <EditIcon fontSize="small" /> Edit
            </Link>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ListingCard;
