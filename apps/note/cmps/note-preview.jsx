export function NotePreview({ note }) {
    return <article className="note-card">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt}</p>
        <section className="note-buttons">
            <button className="fa-solid trash-can"></button>
        </section>
    </article>
}