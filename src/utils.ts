type A11yProps = {
  id: string,
  'aria-controls': string
};

export const a11yProps = (index: number): A11yProps => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const getFavouriteLaunchesFromCache = () => {
  let parsed = localStorage.getItem('launches');
  console.log(parsed);
  return JSON.parse(localStorage.getItem('launches')) ?? []
};

export const removeLaunchFromFavourite = (launch: any): void => {
  const allRecordedLaunches: Array<any> = getFavouriteLaunchesFromCache();
  const updatedAllRecordedLaunches = allRecordedLaunches.filter(recordedLaunch => recordedLaunch.flight_number !== launch.flight_number)
  localStorage.setItem('launches', JSON.stringify(updatedAllRecordedLaunches));
};

export const setLaunchInFavourite = (launch: any): void => {
  const allRecordedLaunches: Array<any> = getFavouriteLaunchesFromCache();
  allRecordedLaunches.push(launch);
  localStorage.setItem('launches', JSON.stringify(allRecordedLaunches));
}

export const mergeLaunchWithRocket = (launch: any, rockets: Array<any>) => {
  return rockets.find((rocket: any) => launch.rocket.rocket_id === rocket.rocket_id)
}
