import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes }) {
    return <section className="notes-container">
        {notes.map(note => <NotePreview note={note} key={note.id} />)}
    </section>
}
