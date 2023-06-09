import './index.css'

const NotFound = () => {
    return (
        <>
            <div className="not_found_container">
                <div className='not_found_img'>
                    <img src="/statics/notfound/snorlax.png" alt="" />
                </div>
                <h1>404 - NOT FOUND</h1>
                <h3>Ooops! We couldn't find that page for you.</h3>
            </div>
        </>
    )
}

export default NotFound;