import { useAppSelector } from '../../app/hooks';
import './index.css'

const Layout = ({ children }) => {

    const showingModal = useAppSelector(state => state.ui.showModal);

    return (
        <>
            <div className={`page_wrapper ${showingModal ? 'disabled' : ''}`}>
                {children}
            </div>
        </>
    )
}

export default Layout;