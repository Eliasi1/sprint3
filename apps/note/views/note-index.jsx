const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";

import { NoteList } from "../cmps/note-list.jsx";

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.getNotes().then(setNotes)
    }, [])

    return <section className="note-index">
        <NoteList notes={notes} />
    </section>
}
