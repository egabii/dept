import { allLaunches, allRockets } from './endpoints';
import { mergeLaunchWithRocket, getFavouriteLaunchesFromCache } from '../utils';

export const fetchLaunches = async () => {
  try {
    const [launchesRes, rocketRes] = await Promise.all([
      fetch(allLaunches), 
      fetch(allRockets)
    ]);

    const favouriteLaunches = getFavouriteLaunchesFromCache();

    if (launchesRes.ok && rocketRes.ok) {
      const launchesJson = await launchesRes.json();
      const rocketJson = await rocketRes.json();
      return launchesJson.map((launch: any) => ({
        ...launch,
        rocket: {
          ...launch.rocket,
          ...( mergeLaunchWithRocket(launch, rocketJson) ?? {})
        },
        favourite: favouriteLaunches.some(favouriteLaunch => favouriteLaunch.flight_number === launch.flight_number)
      }));
    } else {
      throw new Error('fetching data has failed'); 
    } 
  }catch(error) {
    throw new Error('Network issue'); 
  } 
}