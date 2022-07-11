import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { removeLaunchFromFavourite, setLaunchInFavourite } from '../../utils';

type LaunchProps = {
  launch: any
};

const LaunchCard = ({ launch }: LaunchProps) => {

  const [rateFavourite, setRateFavourite] = useState(() => launch.favourite);

  useEffect(() => {
    const anotherLaunch = {
      ...launch,
      favourite: rateFavourite
    };

    if (rateFavourite) {
      setLaunchInFavourite(anotherLaunch);
    } else {
      removeLaunchFromFavourite(anotherLaunch);
    }
  }, [rateFavourite]);

  const onClickFavourite = () => {
    setRateFavourite((prevState: boolean) => {
      return !prevState;
    });
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image={launch?.rocket?.flickr_images[0]}
        alt={launch?.mission_name}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {launch?.mission_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {launch?.details}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" aria-label="mark as favourite" component="span" onClick={onClickFavourite}>
          {rateFavourite ? <StarRateIcon /> : <StarRateOutlinedIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default LaunchCard;