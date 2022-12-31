import { utilService } from "../../../services/util.service.js"

const {Fragment, useState} = React



export function MailPreview ({mail, onStarMail, onRemoveMail, boxType, onCompose}){
 const [toggleBody, setToggleBody] = useState(false)

function onToggleBody(){
    console.log("Toggling body")
setToggleBody((previousToggleState) => !previousToggleState)
}

function onToggleModal(){
    onCompose()
}

    return <Fragment>
    <article className="mail-row">
    <div className="mail-preview mail-actions">
    <button onClick={() => onRemoveMail(mail.id, boxType)} className="fa-solid trash-can"></button>
    <button onClick={() => onStarMail(mail.id)} className={(mail.isStarred)? "fa-solid star" : "fa-regular star" } ></button>
    </div>
    <h2 className='mail-preview subject' onClick={(boxType==='mails')?onToggleBody:onToggleModal}>{mail.subject}</h2>
    <h2 className='mail-preview time-stamp'>{utilService.getFullDate(mail.sentAt)}</h2>
    </article>
    <article className={toggleBody ? "mail-body open":"mail-body"}>
        {toggleBody && <p>{mail.body}</p>}
    </article>
    </Fragment>
}