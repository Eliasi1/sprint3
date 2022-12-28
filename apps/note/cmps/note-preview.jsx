export function NotePreview({ note, onRemoveNote, onOpenModal }) {
    function handleModalOpening(ev){
        if(ev.target.parentElement.classList.contains('note-buttons')) return
        onOpenModal(note)
    }


    return <article onClick={handleModalOpening} className="note-card">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt || 'Empty note'}</p>
        <section className="note-buttons">
            <button onClick={() => onRemoveNote(note.id)} className="fa-solid trash-can"></button>
        </section>
    </article>
}