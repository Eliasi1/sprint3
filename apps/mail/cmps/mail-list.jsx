import {mailService} from '../services/mail.service.js'
import {MailPreview} from '../cmps/email-preview.jsx'

const {useState, useEffect} = React
const { useParams } = ReactRouterDOM


export function MailList({type}) {

const [mails,getMailList] = useState([])
const params = useParams()

console.log(params.filterBy)

useEffect (()=>{
mailService.getMail(params.filterBy).then((mails)=> getMailList(mails))
},[params.filterBy])

    

return <section className='mail-table'>
    <ul className='mails-list'>
    {
    mails.map((mail) => {
        return <MailPreview key={mail.id} mail={mail}/>

    })
    }
</ul>
</section>


}
