export function NotePreview({ note, onRemoveNote }) {
    return <article className="note-card">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt}</p>
        <section className="note-buttons">
            <button onClick={() => onRemoveNote(note.id)} className="fa-solid trash-can"></button>
        </section>
    </article>
}