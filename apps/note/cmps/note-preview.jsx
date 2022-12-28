export function NotePreview({ note }) {
    return <article className="note-card">{note.info.txt}</article>
}