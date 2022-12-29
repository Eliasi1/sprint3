import { DynamicNote } from "./dynamic-note.jsx"

export function NotePreview({ note, onRemoveNote, onOpenModal, onChangeColor }) {
    function handleModalOpening(ev) {
        if (ev.target.parentElement.classList.contains('note-buttons') || ev.target.parentElement.classList.contains('color-button')) return
        onOpenModal(note)
    }

    function handleColorChange({ target }) {
        const { value } = target
        onChangeColor(note, value)
    }


    return <article onClick={handleModalOpening} style={note.style ? note.style : {}} className="note-card">
        <DynamicNote note={note} />
        <section className="note-buttons">
            <button className="fa-solid palette color-button"><input value={note.style ? note.style.backgroundColor : '#ffffff'} onChange={handleColorChange} type="color" /></button>
            <button onClick={() => onRemoveNote(note.id)} className="fa-solid trash-can"></button>
        </section>
    </article>
}