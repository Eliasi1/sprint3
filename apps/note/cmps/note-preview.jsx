const { useNavigate } = ReactRouterDOM

import { DynamicNote } from "./dynamic-note.jsx"

export function NotePreview({ note, onRemoveNote, onOpenModal, onChangeColor, onPinNote, onToggleTodo }) {

    const navigate = useNavigate()

    function handleModalOpening(ev) {
        if (ev.target.parentElement.classList.contains('note-buttons') || ev.target.parentElement.classList.contains('color-button')) return
        onOpenModal(note)
    }

    function handleColorChange({ target }) {
        const { value } = target
        onChangeColor(note, value)
    }

    function onNoteToMail() {
        const subject = note.info.title
        const body = note.info.txt || note.info.url || note.info.todos.map(todo => todo.txt)
        navigate(`/mail/compose?subject=${subject}&body=${body}`)
    }

    return <article onClick={handleModalOpening} style={note.style ? note.style : {}} className="note-card">
        <DynamicNote onToggleTodo={onToggleTodo} note={note} />
        <section className="note-buttons">
            <button onClick={() => onPinNote(note)} className={"fa-solid thumbtack pin-button " + (note.isPinned ? 'pinned' : '')}></button>
            <button onClick={onNoteToMail} className="fa-solid envelope"></button>
            <button className="fa-solid palette color-button"><input value={note.style ? note.style.backgroundColor : '#ffffff'} onChange={handleColorChange} type="color" /></button>
            <button onClick={() => onRemoveNote(note.id)} className="fa-solid trash-can"></button>
        </section>
    </article>
}