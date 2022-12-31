const { useState } = React


export function ComposeModal(props) {

    const [mail, setMail] = useState(props.draftMail)

    function _onSendClick(ev) {
        ev.preventDefault()
        props.onSend(mail)

    }

    function onInput({ target }) {
        const { value, name: field } = target
        setMail((previousMail) => {
            return { ...previousMail, [field]: value }
        })
    }




    return <section className={(props.onModal) ? "compose-modal open" : "compose-modal"}>
        <form className="flex column space-around" onSubmit={_onSendClick}>
            <label htmlFor="recipient">recipient</label>
            {/* <input name="to" id="recipient" type="text" placeholder="enter recipient" value={props.draftMail.to} onChange={props.onHandleChange}/> */}
            <input name="to" id="recipient" type="text" placeholder="enter recipient" onChange={(ev) => { props.onHandleChange(ev); onInput(ev) }} />
            <label htmlFor="subject">subject</label>
            {/* <input name="subject" id="subject" type="text" placeholder="enter subject" value={props.draftMail.subject} onChange={props.onHandleChange}/> */}
            <input name="subject" id="subject" type="text" placeholder="enter subject" onChange={(ev) => { props.onHandleChange(ev); onInput(ev) }} />
            <label htmlFor="Body">Body</label>
            {/* <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body" value={props.draftMail.body} onChange={props.onHandleChange}/> */}
            <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body" onChange={(ev) => { props.onHandleChange(ev); onInput(ev) }} />
            <div className="flex space-around">
                <button className="send-btn" >Send</button>
                <button className="send-btn" onClick={props.onCloseModal} type='button'>Close</button>
            </div>
        </form>
    </section>
}