export function NotePreview({ note }) {
    return <article className="note-card">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt}</p>
    </article>
}