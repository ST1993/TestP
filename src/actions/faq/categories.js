import * as constants from 'constants';
import axios from 'axios';
import createAction from '../createAction';

export const name = 'CATEGORISE';

export const fetchCategories = () => {
  const action = createAction(name);
  return (dispatch) => {
    dispatch(action.request());
    return axios.get(constants.baseEndpoint + 'faqs')
      .then((resp) => {
        dispatch(action.success(resp.data));
      })
      .catch((resp) => {
        dispatch(action.failure(resp.data));
      });
  };
};
