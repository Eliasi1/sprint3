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
        console.log(note)
        setIsModalOpen(true)
        currNoteRef.current = note
    }

    function onCloseModal() {
        setIsModalOpen(false)
        currNoteRef.current = null
    }

    function onSearch(queryStr) {
        setQueryStr(queryStr)
    }

    function setNoteStyle(bgColor) {
        // stole this functionality from google :)

        const c = bgColor.substring(1)  // strip #
        const rgb = parseInt(c, 16)   // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff  // extract red
        const g = (rgb >> 8) & 0xff  // extract green
        const b = (rgb >> 0) & 0xff  // extract blue

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

        if (luma < 80) {
            return { backgroundColor: bgColor, color: 'white' }
        } else {
            return { backgroundColor: bgColor}
        }
    }

    function onChangeColor(note, bgColor) {
        note.style = setNoteStyle(bgColor)
        noteService.save(note).then(() => {
            setNotes(prevNotes => [...prevNotes])
        })
    }

    function onPinNote(note){
        note.isPinned = !note.isPinned
        noteService.save(note).then(() => {
            setNotes(prevNotes => [...prevNotes])
        })
    }

    return <section className="note-index">
        <SearchBar onSearch={onSearch} />
        <NoteAdd onAddNote={onAddNote} />
        <NoteList onPinNote={onPinNote} onChangeColor={onChangeColor} onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} notes={notes} />
        {isModalOpen && <NoteModal onSaveNote={onSaveNote} onCloseModal={onCloseModal} note={currNoteRef.current} />}
        {isModalOpen && <div onClick={onCloseModal} className="overlay"></div>}
    </section>
}
