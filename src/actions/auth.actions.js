import { authConstants } from '../constants/auth.constants';

export const GetAuthUser = (user = null) => {
    return (dispatch) => {
        dispatch({ type: authConstants.GET_AUTH_REQUEST });
        if (user) {
            dispatch({
                type: authConstants.GET_AUTH_SUCCESS,
                payload: user
            });
        }
        if (!user) {
            dispatch({
                type: authConstants.GET_AUTH_FAILURE
            });
        }
    };
};
};
