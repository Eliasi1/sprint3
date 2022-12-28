
export function MailIndex() {
    function onCompose(){
        console.log("compose!")
    }
    function onEmailCategorySelect(ev){
        console.log(ev)
    }

    return <section className="mail-main">
        <div className="nav-btn">
        <button onClick={onCompose} className="glow-on-hover" type="button">Compose</button>   
        <ul>
            <li onClick={onEmailCategorySelect}>Inbox</li>
            <li>Stared</li>
            <li>Sent Email</li>
            <li>Draft</li>
        </ul>
        </div>

    </section>
}

