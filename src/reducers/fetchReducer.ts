
export type StateType = {
  loading: boolean,
  data: null | object,
  complete: boolean,
  error: null | object,
};

export const initialState: StateType = {
  loading: false,
  data: null,
  complete: false,
  error: null
};


export const reducer = (state: StateType, action: any) => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: true, };
    case 'complete':
      return {
        ...state,
        complete: true, 
        loading: false,
        data: action.payload
      };
    case 'error': 
      return {
        ...state,
        complete: true,
        loading: false,
        error: action.payload
      }
    default:
      throw new Error();
  }
};

