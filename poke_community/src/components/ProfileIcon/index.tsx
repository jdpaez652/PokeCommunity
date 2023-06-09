import { useAppSelector } from '../../app/hooks';
import './index.css'

const ProfileIcon = () => {
    const { isAuthenticated, avatar } = useAppSelector(state => state.ui.user);

    return (
        <>
            <div className="profile_avatar">
                {
                    isAuthenticated ? <img src={`/statics/avatars/${avatar}`} /> : <img src='/statics/avatars/default.png' />
                }
            </div >
        </>
    );
};

export default ProfileIcon;
