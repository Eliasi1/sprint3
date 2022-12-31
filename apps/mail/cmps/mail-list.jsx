import { mailService } from '../services/mail.service.js'
import { MailPreview } from '../cmps/email-preview.jsx'



export function MailList({onStarMail, onRemoveMail, mails, boxType}) {

    return <section className='mail-table'>
        <ul className='mails-list flex column'>
            {
                mails.map((mail) => {
                    return <MailPreview key={mail.id} mail={mail} onStarMail={onStarMail} onRemoveMail={onRemoveMail} boxType={boxType} />
                })
            }
        </ul>
    </section>


}
