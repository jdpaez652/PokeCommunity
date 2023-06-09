import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLogout, HiOutlineHome, HiOutlineLogin } from "react-icons/hi";

import './index.css'

import ProfileIcon from "../ProfileIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIsHoveringProfileIcon, setUser } from "../../app/slices/ui/uiSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isHoveringProfileIcon } = useAppSelector(state => state.ui);

  const routes = [
    { to: '/home', text: 'Home', icon: <HiOutlineHome />, private: true },
    { to: '/login', text: 'Log In', icon: <HiOutlineLogin />, publicOnly: true },
  ];

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setUser({ username: '', email: '', avatar: '', isAuthenticated: false }));
    dispatch(setIsHoveringProfileIcon());
    navigate('/');
  }

  const renderProfileMenu = () => {
    if (!user?.isAuthenticated)
      return null;

    return (
      <ul className={isHoveringProfileIcon ? 'profile_menu_visible' : 'profile_menu_hidden'}>
        <li className="profile_menu_list_item">
          <NavLink to={''} onClick={handleLogOut}>
            <HiOutlineLogout />
            Log Out
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <>
      <nav>
        <ul>
          <li className="img_logo_list_item">
            <NavLink to={'/'}>
              <p>POKÉ</p>
              <img src='/statics/pokeball.png' alt="pokemon logo" />
              <p>COMMUNITY</p>
            </NavLink>
          </li>
        </ul>
        <ul className="menu_wrapper">
          {
            routes.map((route) => {
              if (route.publicOnly && user.isAuthenticated) return null;
              if (route.private && !user.isAuthenticated) return null;
              return (
                <li className="menu_wrapper_li" key={route.to}>
                  <NavLink to={route.to}>
                    {route.icon}
                    {route.text}
                  </NavLink>
                </li>
              );
            })
          }
          <li onMouseEnter={() => dispatch(setIsHoveringProfileIcon())} onMouseLeave={() => { dispatch(setIsHoveringProfileIcon()) }}>
            <ProfileIcon />
            {renderProfileMenu()}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
