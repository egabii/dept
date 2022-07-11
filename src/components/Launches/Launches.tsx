import { useEffect, useReducer } from 'react';
import LaunchCard from '../LaunchCard/LaunchCard';
import { reducer, initialState } from '../../reducers/fetchReducer';
import { fetchLaunches } from '../../api/fetchLaunches';

const Launches = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({type: 'loading'});
    const fetching = async () => {
      try {
        const response = await fetchLaunches();
        dispatch({type: 'complete', payload: response});
      }catch(e) {
        dispatch({type: 'error', payload: e});
      } 
    }

    fetching();
  }, []);

  return (
    <>
      {state.loading && <h1> loading...</h1>}
      {(state.complete && state.error) && <h1>There was an error</h1>}
      {(state.complete && state.data) && (
        <ul>
          {state.data.map((launch: any) => <li>
            <LaunchCard key={launch?.flight_number} launch={launch} />
          </li>)}
        </ul>
      )}
    </>
  )
};

export default Launches