import React, { useState, useEffect, useReducer } from 'react';
import { TextField, Typography } from '@mui/material';
import LaunchCard from '../LaunchCard/LaunchCard';
import { reducer, initialState } from '../../reducers/fetchReducer';
import { fetchLaunches } from '../../api/fetchLaunches';
import _ from 'lodash';

const Launches = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    dispatch({type: 'loading'});
    const fetching = async () => {
      try {
        const response = await fetchLaunches();
        dispatch({type: 'complete', payload: response});
      } catch(e) {
        dispatch({type: 'error', payload: e});
      } 
    }

    fetching();
  }, []);

  const renderedData = search !== '' ? (state.data ?? []).filter(launch => {
    return launch.mission_name.toLowerCase().includes(search.toLowerCase());
  }) : (state.data ?? []);

  const onSearch = (event: React.SyntheticEvent): void => {
    const debounced = _.debounce(() => {
      setSearch(event.target.value);
    }, 400);
    debounced();
  }

  return (
    <>
      <div>
        <TextField 
          id="search-launches" 
          placeholder="Search all launches..." 
          variant="outlined"
          autoFocus
          onChange={onSearch}
        />
      </div>
      {state.loading && <h1> loading...</h1>}
      {(state.error) && <h1>There was an error</h1>}
      {(state.complete && state.data) && (
        <>
          { renderedData.length === 0 && <Typography>No launches were found</Typography> }
          <ul>
            {
              renderedData.map((launch: any) =>
                <li>
                  <LaunchCard key={launch?.flight_number} launch={launch} />
                </li>
              )
            }
          </ul>
        </>

      )}
    </>
  )
};

export default Launches