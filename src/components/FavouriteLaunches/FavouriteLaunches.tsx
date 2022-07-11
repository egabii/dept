import { useEffect, useState } from 'react';
import LaunchCard from '../LaunchCard/LaunchCard';
import { Typography } from '@mui/material';
import { getFavouriteLaunchesFromCache } from '../../utils';


const FavouriteLaunches = () => {
  const [favouriteLaunches, setfavouriteLaunches] = useState([]);

  useEffect(() => {
    const rateFavouriteLaunches = getFavouriteLaunchesFromCache();
    setfavouriteLaunches(rateFavouriteLaunches);
  }, []);

  return (
    <>
      {favouriteLaunches.length === 0 && <Typography>Favourite panel is empty</Typography> }
      {
        favouriteLaunches.length > 0 && (
          <ul>
            {favouriteLaunches.map((launch: any) => <li>
              <LaunchCard key={launch?.flight_number} launch={launch} />
            </li>)}
          </ul>
        )
      }
    </>
  );
};

export default FavouriteLaunches;