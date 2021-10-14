import React, { lazy, useState } from 'react';
import { BiMessageRoundedCheck } from 'react-icons/bi';
import { RiNotificationLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { TiMessages } from 'react-icons/ti';
import styles from './Header.module.css';
import Loading from '../Loading';
import { Suspense } from 'react';
import { updateUserStatus } from '../../../helpers/updateStatusUser';
import { STATUS } from '../../../constants/const';
import { auth } from '../../../services/firebase';
import { useDispatch } from 'react-redux';
import { ClearAuthUser } from '../../../actions';
import { useHistory } from 'react-router-dom';

const Language = lazy(() => import('../Language'));

const Header = ({ avatar: avatarImage = '', nickName, gender }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    let showHiddenClass = `${
        showMenu ? styles.dropdownMenu : styles.dropdownclose //styles... not `styles...`
    }`;

    const toggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = async () => {
        updateUserStatus(auth.currentUser.uid, STATUS.OFFLINE);
        dispatch(ClearAuthUser());
        try {
            await auth.signOut();
        } catch (e) {
            console.log('============= error auth sign out ===============', e);
        }
        history.push('/');
    };

    return (
        <Suspense fallback={<Loading />}>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <a href="/" className={styles.headerContainer__logo}>
                        <TiMessages size="3.125rem" />
                    </a>

                    <div className={styles.headerContainer__searchBox}>
                        <form>
                            <input
                                type="text"
                                placeholder="Search..."
                                aria-label="search"
                            />
                        </form>
                    </div>

                    <div className={styles.headerContainer__right}>
                        <i className={styles.hiddenSearch}>
                            <FiSearch />
                        </i>
                        <i>
                            <BiMessageRoundedCheck />
                        </i>
                        <i>
                            <RiNotificationLine />
                        </i>
                        <Language size={24} />
                        <span onClick={toggle}>
                            <img src={avatarImage} alt="Picture Profile" />
                        </span>
                    </div>

                    <div className={`${showHiddenClass}`}>
                        <ul>
                            <li onClick={toggle}>
                                <a href="/profile">
                                    <div>{nickName}</div>
                                    <small>{gender}</small>
                                </a>
                            </li>

                            <li onClick={toggle}>
                                <a href="#">Dashboard</a>
                            </li>

                            <li onClick={toggle}>
                                <a href="#">Setting</a>
                                {/*will add page: show userInfo data (nikcname, gender, avatar, dob from firebase db)*/}
                            </li>

                            <li onClick={(toggle, handleLogout)}>
                                <a href="/">Signout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Header;
