const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";

import { NoteList } from "../cmps/note-list.jsx";
import { NoteAdd } from "../cmps/note-add.jsx";

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.getNotes().then(setNotes)
    }, [])

    function onAddNote(note) {
        noteService.save(note).then(note => {
            setNotes(prevNotes => [note, ...prevNotes])
        })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
        })
    }

    return <section className="note-index">
        <NoteAdd onAddNote={onAddNote} />
        <NoteList onRemoveNote={onRemoveNote} notes={notes} />
    </section>
}
