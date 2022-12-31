const { useNavigate } = ReactRouterDOM

export function Home() {

    const navigate = useNavigate()

    return <section className="home">
        <h1>Welcome to Appsus</h1>
        <div className="image-container">
            <div title="Go to mails" onClick={() => navigate('/mail/inbox')} className="img"><img src="./assets/img/mail.svg" alt="mail image" /></div>
            <div title="Go to notes" onClick={() => navigate('/note')} className="img"><img src="./assets/img/notes.svg" alt="notes image" /></div>
        </div>
    </section>
}