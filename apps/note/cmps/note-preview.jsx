export function NotePreview({ note, onRemoveNote, onOpenModal }) {
    return <article onClick={() => onOpenModal(note)} className="note-card">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt || 'Empty note'}</p>
        <section className="note-buttons">
            <button onClick={() => onRemoveNote(note.id)} className="fa-solid trash-can"></button>
        </section>
    </article>
}