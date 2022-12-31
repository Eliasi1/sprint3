const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    function onToggleMenu(){
        document.body.classList.toggle('menu-open')
    }

    return <header className="app-header full main-layout">
        <div className="flex space-between align-center">
            <Link to="/">
                <div className="brand"><h3>Appsus</h3></div>
            </Link>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
            <button onClick={onToggleMenu} className="fa-solid bars menu-btn"></button>
        </div>
    </header>
}
