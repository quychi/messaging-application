import { db } from '../services/firebase';

export const updateUserStatus = (userUid = null, status) => {
    if (userUid) {
        try {
            db.ref('users/' + userUid).update({
                status
            });
        } catch (error) {
            console.log(
                '============  write data error =============',
                error.message
            );
        }
    } else console.log('============ userUid is null =============');
};
