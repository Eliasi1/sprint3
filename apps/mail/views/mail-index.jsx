const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM
const {Fragment} = React



import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { ComposeEmail } from "../cmps/compose-email.jsx"
import { ComposeModal } from "../cmps/compose-modal.jsx"
import { SearchBar } from "../../../cmps/search-bar.jsx"


export function MailIndex() {

    const [mails, setMails] = useState([])
    const [onModal, setOnModal] = useState(false)
    const params = useParams()
    const [draftMail, setDraft] = useState({})
    const debounce = useRef(null)



    useEffect(() => {
        mailService.getMails(params.filterBy).then((mails) => setMails(mails))
    }, [params.filterBy])

    useEffect(() => {
        // console.log(draftMail.then((draft)=> console.log(draft)))
        if (debounce.current || !draftMail.id) return
        console.log('saving draft email..')
        debounce.current = true
        mailService.saveDraft(draftMail).then(draftMail=> {console.log("saved");console.log(draftMail)})
        setTimeout(()=> debounce.current=false,5000)
    }, [draftMail])

    function onCompose() {
        setOnModal(true)
        const newDraft = mailService.createDraft().then((newDraft) => {console.log("new draft: ");console.log(newDraft);setDraft(newDraft);console.log("saving to drafts..")})
        // setDraft(mailService.createDraft())
    }

    function onStarMail(id) {
        mailService.toggleStarMail(id).then(() => {
            const mailIdx = mails.findIndex((mail) => mail.id === id)
            mails[mailIdx].isStarred = !mails[mailIdx].isStarred
            setMails([...mails])
        })
    }

    function onRemoveMail(id, boxtype='mails') {
        mailService.removeMail(id,boxtype).then(() => {
            const newMails = mails.filter((mail) => mail.id != id)
            setMails(newMails)
        })
    }

    function onHandleChange({ target }) {
        const { value, name: field } = target
        setDraft((previousMail) => {
            return { ...previousMail, [field]: value }
        })
    }

    function onSend(draftValues) {
        const {to,subject,body} = draftValues
        const sentAt = Date.now()
        // console.log(to,subject,body,sentAt)
        setDraft((previousMail) => { return {...previousMail,to,subject,body,sentAt}})
        mailService.saveDraft(draftMail).then(() => mailService.sendMail(draftMail.id) )
        onCloseModal()

    }

    function onCloseModal() {
        setOnModal(false)
    }


    return (
        <Fragment>
            <SearchBar />
        <section className="mail-main">
            <div className="nav-btn app-nav flex column">
                <button onClick={onCompose} className="glow-on-hover" type="button">Compose</button>
                <NavLink to="/mail/inbox"><span>Inbox</span></NavLink>
                <NavLink to="/mail/sent"><span>Sent</span></NavLink>
                <NavLink to="/mail/starred"><span>Starred</span></NavLink>
                <NavLink to="/mail/draft"><span>Draft</span></NavLink>
            </div>
            <MailList onStarMail={onStarMail} onRemoveMail={onRemoveMail} mails={mails} boxType={params.filterBy === 'draft' ? 'draft':'mail'} />
            <ComposeModal onHandleChange={onHandleChange} draftMail={draftMail} onModal={onModal} onSend={onSend} onCloseModal={onCloseModal} />
            <div>

            </div>

        </section>
        </Fragment>
    )
}

