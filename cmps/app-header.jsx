const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    function onToggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    function closeMenu(){
        document.body.classList.remove('menu-open')
    }

    return <header className="app-header full main-layout">
        <div className="flex space-between align-center">
            <Link to="/">
                <div className="brand"><h3>Appsus</h3></div>
            </Link>
            <nav className="main-nav">
                <NavLink onClick={closeMenu} to="/">Home</NavLink>
                <NavLink onClick={closeMenu} to="/about">About</NavLink>
                <NavLink onClick={closeMenu} to="/mail/inbox">Mail</NavLink>
                <NavLink onClick={closeMenu} to="/note">Note</NavLink>
                <NavLink onClick={closeMenu} to="/book">Book</NavLink>
            </nav>
            <button onClick={onToggleMenu} className="fa-solid bars menu-btn"></button>
        </div>
    </header>
}
