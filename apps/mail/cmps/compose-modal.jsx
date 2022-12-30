const useRef = React

export function ComposeModal(props){

    return <section className={(props.onModal) ? "compose-modal open" : "compose-modal" }>
    <form className="flex column space-around" onSubmit={props.onSubmit}>
        <label htmlFor="recipient">recipient</label>
        {/* <input name="to" id="recipient" type="text" placeholder="enter recipient" value={props.draftMail.to} onChange={props.onHandleChange}/> */}
        <input name="to" id="recipient" type="text" placeholder="enter recipient" onChange={props.onHandleChange}/>
        <label htmlFor="subject">subject</label>
        {/* <input name="subject" id="subject" type="text" placeholder="enter subject" value={props.draftMail.subject} onChange={props.onHandleChange}/> */}
        <input name="subject" id="subject" type="text" placeholder="enter subject" onChange={props.onHandleChange}/>
        <label htmlFor="Body">Body</label>
        {/* <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body" value={props.draftMail.body} onChange={props.onHandleChange}/> */}
        <textarea name="body" rows={10} id="Body" type="text" placeholder="enter Body"  onChange={props.onHandleChange}/>
        <div className="flex space-around">
        <button className="send-btn" onClick={props.onSend}>Send</button>
        <button className="send-btn" onClick={props.onCloseModal} type='button'>Close</button>
        </div>
    </form>
</section>
}