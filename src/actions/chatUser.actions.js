import { chatUserConstants } from '../constants/chatUser.constants';

export const SaveChatUser = (member0Uid = '', member1Uid = '') => {
    return (dispatch) => {
        dispatch({ type: chatUserConstants.SAVE_CHATUSER_REQUEST });
        if (member0Uid !== '' && member1Uid !== '') {
            dispatch({
                type: chatUserConstants.SAVE_CHATUSER_SUCCESS,
                payload: {
                    member0Uid: member0Uid,
                    member1Uid: member1Uid
                }
            });
        } else {
            dispatch({
                type: chatUserConstants.SAVE_CHATUSER_FAILURE
            });
        }
    };
};
