import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote, onOpenModal, onChangeColor }) {
    return <section className="notes-container">
        {notes.map(note => <NotePreview onChangeColor={onChangeColor} onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} note={note} key={note.id} />)}
    </section>
}
