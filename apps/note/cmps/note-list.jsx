const { Fragment } = React

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote, onOpenModal, onChangeColor, onPinNote }) {

    const pinnedNotes = notes.filter(note => note.isPinned)
    notes = notes.filter(note => !note.isPinned)

    return <section className="notes-container">
        {pinnedNotes[0] &&
            <Fragment>
                <h3>Pinned</h3>
                <section className="pinned-notes">
                    {pinnedNotes.map(note => <NotePreview onPinNote={onPinNote} onChangeColor={onChangeColor} onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} note={note} key={note.id} />)}
                </section>
            </Fragment>


        }

        {notes[0] &&
            <Fragment>
            {pinnedNotes[0] && <h3>Others</h3>}
            <section className="pinned-notes">
                {notes.map(note => <NotePreview onPinNote={onPinNote} onChangeColor={onChangeColor} onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} note={note} key={note.id} />)}
            </section>
        </Fragment>
        }
        {/* {notes.map(note => <NotePreview onPinNote={onPinNote} onChangeColor={onChangeColor} onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} note={note} key={note.id} />)} */}
    </section>
}
