const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM



import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { ComposeEmail } from "../cmps/compose-email.jsx"
import { ComposeModal } from "../cmps/compose-modal.jsx"
import { SearchBar } from "../../../cmps/search-bar.jsx"


export function MailIndex() {

    const [mails, setMails] = useState([])
    const [onModal, setOnModal] = useState(false)
    const params = useParams()
    const [draftMail, setMail] = useState(mailService.getEmptyMail())



    useEffect(() => {
        mailService.getMails(params.filterBy).then((mails) => setMails(mails))
    }, [params.filterBy])

    function onCompose() {
        console.log("compose!")
        setOnModal(true)
        const mail = mailService.createDraft()
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

    function onSubmit(ev) {
        ev.preventDefault()
        console.log("submit")
    }

    function onHandleChange({ target }) {
        const { value, name: field } = target
        setMail((previousMail) => {
            console.log(previousMail)
            return { ...previousMail, [field]: value }
        })
    }

    function onSend(){
        console.log("sending!")
    }

    function onCloseModal(){
        setOnModal(true)
    }


    return (
        <section className="mail-main">
            <div className="nav-btn app-nav flex column">
                <SearchBar />
                <button onClick={onCompose} className="glow-on-hover" type="button">Compose</button>
                <NavLink to="/mail/inbox"><span>Inbox</span></NavLink>
                <NavLink to="/mail/sent"><span>Sent</span></NavLink>
                <NavLink to="/mail/starred"><span>Starred</span></NavLink>
                <NavLink to="/mail/draft"><span>Draft</span></NavLink>
            </div>
            <MailList onStarMail={onStarMail} onRemoveMail={onRemoveMail} mails={mails} />
            {<ComposeModal onHandleChange={onHandleChange} onSubmit={onSubmit} draftMail={draftMail} onModal={onModal} onSend={onSend} onCloseModal={onCloseModal}/>}
            <div>

            </div>

        </section>
    )
}

