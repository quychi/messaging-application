import { db } from '../services/firebase';

export const updateUserStatus = (userUid = null, status) => {
    if (userUid) {
        try {
            db.ref('users/' + userUid).update({
                status
            });
        } catch (error) {
            //should use react-toastify
        }
    }
};
