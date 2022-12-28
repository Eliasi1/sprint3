import {mailService} from '../services/mail.service.js'
import {MailPreview} from '../cmps/email-preview.jsx'

const {useState, useEffect} = React

export function MailList() {
const [mails,getMailList] = useState(mailService.getMail())

    

return <ul className='mails-list'>
    {
    mails.map((mail) => {
        return <MailPreview mail={mail}/>

    })
    }
</ul> 


}
