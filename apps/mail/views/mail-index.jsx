const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React
const { useParams, useLocation } = ReactRouterDOM
const { Fragment } = React


import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { ComposeEmail } from "../cmps/compose-email.jsx"
import { ComposeModal } from "../cmps/compose-modal.jsx"
import { SearchBar } from "../../../cmps/search-bar.jsx"






export function MailIndex() {

    const [mails, setMails] = useState([])
    let location = useLocation()
    const [isOpenMailMenu, setOpenMailMenu] = useState(false)
    const params = useParams()
    const [queryStr, setQueryStr] = useState('')
    const [draftMail, setDraft] = useState(mailService.getEmptyMail())
    const [onModal, setOnModal] = useState(false)


    useEffect(() => {
        mailService.getMails({ boxType: params.filterBy, queryStr }).then((mails) => setMails(mails))
        console.log(location)
    
    }, [params.filterBy, queryStr])


    function onCompose() {
        setOnModal(true)
        const newDraft = mailService.createDraft().then((newDraft) => {setDraft(newDraft) })
    }


    function onSearch(searchText) {
        setQueryStr(searchText)
    }

    function onStarMail(id) {
        mailService.toggleStarMail(id).then(() => {
            const mailIdx = mails.findIndex((mail) => mail.id === id)
            mails[mailIdx].isStarred = !mails[mailIdx].isStarred
            setMails([...mails])
        })
    }

    function onRemoveMail(id, boxtype = 'mails') {
        mailService.removeMail(id, boxtype).then(() => {
            const newMails = mails.filter((mail) => mail.id != id)
            setMails(newMails)
        })
    }

    function onSend(draftValues) {
        const { to, subject, body } = draftValues
        const sentAt = Date.now()
        // console.log(to,subject,body,sentAt)
        setDraft((previousMail) => { return { ...previousMail, to, subject, body, sentAt } })
        mailService.saveDraft(draftMail).then(() => mailService.sendMail(draftMail.id))
        onCloseModal()

    }

    function onCloseModal() {
        setOnModal(false)
    }

    function onToggleMenu() {
        setOpenMailMenu((previousState) => !previousState)
    }

    function closeMenu() {
        //    classList.remove('mail-menu-open')
    }

    return (
        <Fragment>
            <section className="mail-main">
                <div className="search-space flex space-around">
                    <button onClick={onToggleMenu} className="fa-solid bars mail-menu-btn"></button>
                    <SearchBar onSearch={onSearch} />
                </div>
                <div className="mail-container">
                    <div className={(isOpenMailMenu)? "nav-btn flex column mail-menu-open":"nav-btn flex column"}>
                        <button onClick={onCompose} className="glow-on-hover" type="button">Compose</button>
                        <NavLink to="/mail/inbox"><span>Inbox</span></NavLink>
                        <NavLink to="/mail/sent"><span>Sent</span></NavLink>
                        <NavLink to="/mail/starred"><span>Starred</span></NavLink>
                        <NavLink to="/mail/draft"><span>Draft</span></NavLink>
                    </div>
                    <MailList onStarMail={onStarMail} onRemoveMail={onRemoveMail} mails={mails} onCompose={onCompose} boxType={params.filterBy === 'draft' ? 'draft' : 'mails'} />
                    <ComposeModal setDraft={setDraft} draftMail={draftMail} onModal={onModal} onSend={onSend} onCloseModal={onCloseModal} setOnModal={setOnModal} />
                    <div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}

