import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote }) {
    return <section className="notes-container">
        {notes.map(note => <NotePreview onRemoveNote={onRemoveNote} note={note} key={note.id} />)}
    </section>
}
