import { chatUserConstants } from '../constants/chatUser.constants';

export const SaveChatUser = (fromUid = '', toUid = '') => {
    return (dispatch) => {
        dispatch({ type: chatUserConstants.SAVE_CHATUSER_REQUEST });
        if (fromUid !== '' && toUid !== '') {
            dispatch({
                type: chatUserConstants.SAVE_CHATUSER_SUCCESS,
                payload: {
                    fromUid: fromUid,
                    toUid: toUid
                }
            });
        } else {
            console.log(
                '==================== can not save chat user because the parameter ==================== '
            );
            dispatch({
                type: chatUserConstants.SAVE_CHATUSER_FAILURE
            });
        }
    };
};
