import { BrowserRouter, useRoutes } from 'react-router-dom'

import Layout from './components/Layout';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useAppSelector } from './app/hooks';
import Modal from './components/Modal';

const AppRoutes = () => {
  const isAuthenticated = useAppSelector(state => state.ui.user.isAuthenticated);

  const routes = useRoutes([
    { path: '/', element: isAuthenticated ? <About /> : <Login /> },
    { path: '/home', element: isAuthenticated ? <Home /> : <Login /> },
    { path: '/login', element: !isAuthenticated ? <Login /> : <Home /> },
    { path: '*', element: <NotFound /> }
  ])
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <AppRoutes />
      </Layout>
      <Modal />
    </BrowserRouter>
  )
}

export default App
