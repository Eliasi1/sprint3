const { Link, NavLink } = ReactRouterDOM

export function MailIndex() {
    function onCompose() {
        console.log("compose!")
    }

    return <section className="mail-main">
        <div className="nav-btn app-nav flex column">
            <button onClick={onCompose} className="glow-on-hover" type="button">Compose</button>
            <NavLink to="/mail/inbox"><span>Inbox</span></NavLink>
            <NavLink to="/mail/sent"><span>Sent</span></NavLink>
            <NavLink to="/mail/starred"><span>Starred</span></NavLink>
            <NavLink to="/mail/draft"><span>Draft</span></NavLink>

        </div>

    </section>
}

