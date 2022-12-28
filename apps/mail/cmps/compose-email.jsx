import {mailService} from '../services/mail.service.js' 

const {useState} = React

export function ComposeEmail(){

     const [mail,setMail] = useState(mailService.getEmptyMail())

    function onSubmit(ev){
        ev.preventDefault()
        console.log("submit")
    }

    function onHandleChange({target}){
        const {value,name:field} = target
        setMail((previousMail) =>{
            return {...previousMail,[field]:value}
        })
    }





    return <section className="compose-email">
        <form className="flex column" onSubmit={onSubmit}>
            <label htmlFor="recipient">recipient</label>
            <input name="to" id="recipient" type="text" placeholder="enter recipient" value={mail.to} onChange={onHandleChange}/>
            <label htmlFor="subject">subject</label>
            <input name="subject" id="subject" type="text" placeholder="enter subject" value={mail.subject} onChange={onHandleChange}/>
            <label htmlFor="Body">Body</label>
            <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body" value={mail.body} onChange={onHandleChange}/>
            <button>Send</button>
        </form>
    </section>
}