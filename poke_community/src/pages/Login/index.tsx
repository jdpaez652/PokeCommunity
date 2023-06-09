import { HiEye, HiEyeOff } from 'react-icons/hi';

import './index.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserSession, setLoginPassword, setLoginUsername, setShowPassword, setUser } from '../../app/slices/ui/uiSlice';
import { redirect, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { showPassword, logIn, user } = useAppSelector(state => state.ui);

    useEffect(() => {
        dispatch(getUserSession());

        if (user?.isAuthenticated)
            navigate(-1);
    });

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            username: logIn.username,
            email: 'jdpaez@outlet.com',
            avatar: 'pikachu.png',
            isAuthenticated: true,
        }
        dispatch(setUser(userData));

        localStorage.setItem('userSession', JSON.stringify(userData));

        redirect('/home');
    }

    return (
        <div className='login_container'>
            <Card>
                <div className='welcome_container'>
                    <img src="/statics/login/pikachu-transparent.png" alt="" />
                    <hr />
                    <h1>Welcome!</h1>
                </div>
                <form onSubmit={handleSignIn}>
                    <div className='input_container'>
                        <input id='username' type="text" value={logIn.username} onChange={(e) => { dispatch(setLoginUsername(e.target.value)) }} required autoComplete='off' />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className='input_container'>
                        <input id='password' type={showPassword ? 'text' : 'password'} value={logIn.password} onChange={e => { dispatch(setLoginPassword(e.target.value)) }} required />
                        <i className='password_eye' onClick={() => {
                            dispatch(setShowPassword())
                        }}>
                            {
                                showPassword ? <HiEyeOff /> : <HiEye />
                            }
                        </i>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className='btns_container'>
                        <button type='submit'>Log In</button>
                        <span>--Or if you don't have an account--</span>
                        <button type='button'>Sign Up</button>
                    </div>
                </form>
            </Card>
        </div>

    );
}

export default Login;