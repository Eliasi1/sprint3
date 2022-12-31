import { utilService } from "../../../services/util.service.js"

// const {Fragment} = React



export function MailPreview ({mail, onStarMail, onRemoveMail, boxType}){

    return <article className="mail-row">
    <div className="mail-preview mail-actions">
    <button onClick={() => onRemoveMail(mail.id, boxType)} className="fa-solid trash-can"></button>
    <button onClick={() => onStarMail(mail.id)} className={(mail.isStarred)? "fa-solid star" : "fa-regular star" } ></button>
    </div>
    <h2 className='mail-preview subject'>{mail.subject}</h2>
    <h2 className='mail-preview time-stamp'>{utilService.getFullDate(mail.sentAt)}</h2>
    </article>
}