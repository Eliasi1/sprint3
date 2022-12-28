const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header full main-layout">
        <div>
            <Link to="/">
                <h3>LOGO!</h3>
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </div>
    </header>
}
