import {mailService} from '../services/mail.service.js' 
import { ComposeModal } from './compose-modal.jsx'

const {useState, useRef, useEffect} = React

export function ComposeEmail({mailId}){
    const modalRef = useRef(null)
    
    useEffect(()=>{        
        modalRef.current.classList.add("open")
    },[])


    return <ComposeModal onHandleChange={onHandleChange} onSubmit={onSubmit} ref={modalRef} draftMail={draftMail} onSend={onSend} />
}