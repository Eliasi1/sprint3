const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React
const { useParams } = ReactRouterDOM



import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { ComposeEmail } from "../cmps/compose-email.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const params = useParams()



    useEffect(() => {
        mailService.getMail(params.filterBy).then((mails) => setMails(mails))
    }, [params.filterBy])

    function onCompose() {
        console.log("compose!")
    }

    function onStarMail(id) {
        mailService.toggleStarMail(id).then(() => {
            const mailIdx = mails.findIndex((mail) => mail.id === id)
            mails[mailIdx].isStarred = !mails[mailIdx].isStarred
            setMails([...mails])
        })
    }

    function onRemoveMail(id) {
        mailService.removeMail(id).then(() => {
            const newMails = mails.filter((mail) => mail.id != id)
            setMails(newMails)
        })
    }

    return (
        <section className="mail-main">
            <div className="nav-btn app-nav flex column">
                <button onClick={onCompose} className="glow-on-hover" type="button">Compose</button>
                <NavLink to="/mail/inbox"><span>Inbox</span></NavLink>
                <NavLink to="/mail/sent"><span>Sent</span></NavLink>
                <NavLink to="/mail/starred"><span>Starred</span></NavLink>
                <NavLink to="/mail/draft"><span>Draft</span></NavLink>
            </div>
            <MailList onStarMail={onStarMail} onRemoveMail={onRemoveMail} mails={mails} />
            <ComposeEmail />
            <div>

            </div>

        </section>
    )
}

