import React, { useEffect, useReducer, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { reducer, initialState } from '../../reducers/fetchReducer';
import LaunchCard from '../LaunchCard/LaunchCard';
import TabPanel from '../TabPanel/TabPanel';
import FavouriteLaunches from '../FavouriteLaunches/FavouriteLaunches';
import { a11yProps } from '../../utils';

const Launches = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [panelView, setPanelVview] = useState<number>(0);

  const handlePanelView = (event: React.SyntheticEvent, newValue: number) => {
    setPanelVview(newValue);
  };

  useEffect(() => {
    dispatch({type: 'loading'});
    const fetchLaunches = async () => {
      try {
        const responses = await Promise.all([fetch('https://api.spacexdata.com/v3/launches'), fetch('https://api.spacexdata.com/v3/rockets')]);
        const rocketRes =  responses[1];
        const launchesRes = responses[0];
        if (launchesRes.ok && rocketRes.ok) {
          const launchesJson = await launchesRes.json();
          const rocketJson = await rocketRes.json();
          dispatch({type: 'complete', payload: launchesJson.map((launch: any) => ({
            ...launch,
            rocket: {
              ...launch.rocket,
              ...(rocketJson.find((rocket: any) => launch.rocket.rocket_id === rocket.rocket_id) ?? {})
            },
            favourite: false
          }))});
        } else {
          dispatch({type: 'error', payload: 'there was an error on fetching data'});
        }
      }catch(e) {
        dispatch({type: 'error', payload: e});
        throw e;
      } 
    }

    fetchLaunches();
  }, []);

  return (
    <>
      {state.loading && <h1> loading...</h1>}
      {(state.complete && state.error) && <h1>There was an error</h1>}
      {(state.complete && state.data) && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={panelView} onChange={handlePanelView} aria-label="basic tabs example">
              <Tab label="Launches" {...a11yProps(0)} />
              <Tab label="Favourites" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={panelView} index={0}>
            <ul>
              {state.data.map((launch: any) => <li>
                <LaunchCard launch={launch} />
              </li>)}
            </ul>
          </TabPanel>
          <TabPanel value={panelView} index={1}>
            <FavouriteLaunches />
          </TabPanel>
        </>
      )}
    </>
  )
};

export default Launches