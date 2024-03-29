import * as constants from 'constants';
import axios from 'axios';
import createAction from '../createAction';
import qs from 'qs';

export const name = 'FETCH_INVITE_SHARING';

export const fetchInviteSharing = (type) => {
  const action = createAction(name);
  return (dispatch) => {
    dispatch(action.request());
    return axios.get(
        `${constants.baseEndpointV1}activitys/${type}/get_share_params`
      )
      .then((resp) => {
        dispatch(action.success(resp.data));
      })
      .catch((resp) => {
        dispatch(action.failure(resp));
      });
  };
};
