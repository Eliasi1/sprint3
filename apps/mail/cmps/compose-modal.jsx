import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React

export function ComposeModal(props) {
    
    const [mail, setMail] = useState(props.draftMail)
    const debounce = useRef(null)

    useEffect(()=>{
        let {to,subject,body} = props.draftMail
        if (to.includes("<") ) to = ''
        if (subject.includes("<") ) subject = ''
        if (body.includes("<") ) body = ''
        setMail({...mail,to,subject,body})
    },[])

    useEffect(() => {
        if (debounce.current || !mail.id) return
        console.log('saving draft email..')
        debounce.current = true
        mailService.saveDraft(mail).then(draftMail => { console.log("saved"); console.log(draftMail) })
        setTimeout(() => debounce.current = false, 5000)
    }, [mail])

    function onHandleChange({ target }) {
        const { value, name: field } = target
        setMail ((previousMail) => {
            return { ...previousMail, [field]: value } 
        })
        props.setDraft((previousMail) => {
            return { ...previousMail, [field]: value }
        })
    }



    function _onSendClick(ev) {
        ev.preventDefault()
        props.onSend(mail)

    }

    function onInput({target}) {
        const { value, name: field } = target
        setMail((previousMail) => {
            return { ...previousMail, [field]: value }
        })
    }




    return <section className={(props.onModal) ? "compose-modal open" : "compose-modal"}>
        <form className="flex column space-around" onSubmit={_onSendClick}>
            <label htmlFor="recipient">recipient</label>
            <input name="to" id="recipient" type="text" placeholder="enter recipient" value={mail.to} onChange={onHandleChange}/>
            {/* <input name="to" id="recipient" type="text" placeholder="enter recipient" onChange={(ev) => { props.onHandleChange(ev); onInput(ev) }} /> */}
            <label htmlFor="subject">subject</label>
            <input name="subject" id="subject" type="text" placeholder="enter subject" value={mail.subject} onChange={onHandleChange}/>
            {/* <input name="subject" id="subject" type="text" placeholder="enter subject" onChange={(ev) => { props.onHandleChange(ev); onInput(ev) }} /> */}
            <label htmlFor="Body">Body</label>
            <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body" value={mail.body} onChange={onHandleChange}/>
            {/* <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body" onChange={(ev) => { props.onHandleChange(ev); onInput(ev) }} /> */}
            <div className="flex space-around">
                <button className="send-btn" >Send</button>
                <button className="send-btn" onClick={props.onCloseModal} type='button'>Close</button>
            </div>
        </form>
    </section>
}
