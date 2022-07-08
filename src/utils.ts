export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const getLaunchesFromFavourite = () => JSON.parse(localStorage.getItem('launches')) ?? [];

export const removeLaunchFromFavourite = (launch: any) => {
  const allRecordedLaunches: Array<any> = getLaunchesFromFavourite();
  const updatedAllRecordedLaunches = allRecordedLaunches.filter(recordedLaunch => recordedLaunch.flight_number !== launch.flight_number)
  localStorage.setItem('launches', JSON.stringify(updatedAllRecordedLaunches));
};

export const setLaunchInFavourite = (launch: any) => {
  const allRecordedLaunches: Array<any> = getLaunchesFromFavourite();
  allRecordedLaunches.push(launch);
  localStorage.setItem('launches', JSON.stringify(allRecordedLaunches));
}
