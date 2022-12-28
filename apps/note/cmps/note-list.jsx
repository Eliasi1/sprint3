import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote, onOpenModal }) {
    return <section className="notes-container">
        {notes.map(note => <NotePreview onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} note={note} key={note.id} />)}
    </section>
}
