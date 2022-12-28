const {Fragment} = React

export function MailPreview ({mail}){
    
    return <h2 className='mail-preview subject'>{mail.subject}</h2>
}