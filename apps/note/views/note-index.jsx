const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js";

import { NoteList } from "../cmps/note-list.jsx";
import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteModal } from "../cmps/note-modal.jsx";
import { SearchBar } from "../../../cmps/search-bar.jsx";

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [queryStr, setQueryStr] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const currNoteRef = useRef(null)

    useEffect(() => {
        loadNotes()
    }, [queryStr])

    function loadNotes() {
        noteService.getNotes(queryStr).then(setNotes)
    }

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

    function onSaveNote(note) {
        noteService.save(note).then(() => loadNotes())
    }

    function onOpenModal(note) {
        setIsModalOpen(true)
        currNoteRef.current = note
    }

    function onCloseModal() {
        setIsModalOpen(false)
        currNoteRef.current = null
    }

    function onSearch(queryStr){
        setQueryStr(queryStr)
    }

    return <section className="note-index">
        <SearchBar onSearch={onSearch}/>
        <NoteAdd onAddNote={onAddNote} />
        <NoteList onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} notes={notes} />
        {isModalOpen && <NoteModal onSaveNote={onSaveNote} onCloseModal={onCloseModal} note={currNoteRef.current} />}
        {isModalOpen && <div onClick={onCloseModal} className="overlay"></div>}
    </section>
}
