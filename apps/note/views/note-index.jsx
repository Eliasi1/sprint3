const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js";

import { NoteList } from "../cmps/note-list.jsx";
import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteModal } from "../cmps/note-modal.jsx";
import { SearchBar } from "../../../cmps/search-bar.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";

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
            showSuccessMsg('Note added')
            setNotes(prevNotes => [note, ...prevNotes])
        })
            .catch(err => {
                console.log('Had issues adding note', err)
                showErrorMsg('Failed to add note')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            showSuccessMsg('Note deleted')
            setNotes(updatedNotes)
        })
            .catch(err => {
                console.log('Had issues removing note', err)
                showErrorMsg('Failed to delete note')
            })
    }

    function onSaveNote(note) {
        noteService.save(note).then(() => {
            showSuccessMsg('Note saved')
            loadNotes()
        })
            .catch(err => {
                console.log('Had issues saving note', err)
                showErrorMsg('Failed to save note')
            })
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
            return { backgroundColor: bgColor }
        }
    }

    function onChangeColor(note, bgColor) {
        note.style = setNoteStyle(bgColor)
        noteService.save(note).then(() => {
            setNotes(prevNotes => [...prevNotes])
        })
    }

    function onPinNote(note) {
        note.isPinned = !note.isPinned
        noteService.save(note).then(() => {
            if (note.isPinned) showSuccessMsg('Note pinned')
            else showSuccessMsg('Note unpinned')

            setNotes(prevNotes => [...prevNotes])
        })
            .catch(err => {
                console.log('Had issues pinning note', err)
                showErrorMsg('Failed to pin note')
            })
    }

    function onToggleTodo(ev, todo, note) {
        ev.stopPropagation()
        if (todo.doneAt) todo.doneAt = null
        else todo.doneAt = Date.now()
        noteService.save(note).then(() => {
            setNotes(prevNotes => [...prevNotes])
        })
    }

    return <section className="note-index">
        <SearchBar onSearch={onSearch} />
        <NoteAdd onAddNote={onAddNote} />
        <NoteList onToggleTodo={onToggleTodo} onPinNote={onPinNote} onChangeColor={onChangeColor} onOpenModal={onOpenModal} onRemoveNote={onRemoveNote} notes={notes} />
        {isModalOpen && <NoteModal onSaveNote={onSaveNote} onCloseModal={onCloseModal} note={currNoteRef.current} />}
        {isModalOpen && <div onClick={onCloseModal} className="overlay"></div>}
    </section>
}
