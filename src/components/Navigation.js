import logo from '../images/logo.png';

const Navigation = () => {
    return (
        <nav className='navigation'>
            <div className='nav-logo'>
                <img src={logo} />
                <h1>AQI Tracker</h1>
            </div>
            <div className='nav-login'>
                <button>Log In</button>
            </div>
        </nav>
    )
}

export default Navigation
