const { useState, useEffect } = React

import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {

    const [isAddingNote, setIsAddingNote] = useState(false)
    const [note, setNote] = useState(noteService.getEmptyNote())

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick)

        return () => {
            document.body.removeEventListener('click', handleBodyClick)
        }
    }, [])

    function handleBodyClick(ev) {
        if (!ev.target.parentElement) return
        if (ev.target.name || ev.target.parentElement.classList.contains('note-add-buttons')) return
        setIsAddingNote(false)
        setNote(noteService.getEmptyNote())
    }

    function onOpenForm(ev) {
        ev.stopPropagation()
        setIsAddingNote((prevIsAddingNote => !prevIsAddingNote))
        setNote(noteService.getEmptyNote())
    }

    function handleInput({ target }) {
        let { value, name: field } = target
        if (field === 'todos') {
            const todosTxts = value.split(',')
            // ({ ...prevNote, info: { ...prevNote.info, [field]: [...prevNote.info.todos] } })
            console.log(todosTxts)
            setNote((prevNote) => {
                todosTxts.forEach((todoStr, idx) => {
                    if (prevNote.info.todos[idx]) prevNote.info.todos[idx].txt = todoStr
                    else prevNote.info.todos.push({ txt: todoStr, doneAt: null })

                })
                return { ...prevNote, info: { ...prevNote.info, [field]: [...prevNote.info.todos] } }
            })
        } else {
            setNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        }
    }

    function handleAddingNote() {
        const youtubeVidId = utilService.extractYoutubeVidId(note.info.url)
        if (youtubeVidId) note.info.url = `https://www.youtube.com/embed/${youtubeVidId}`
        onAddNote(note)
        setNote(noteService.getEmptyNote())
    }

    function setNoteType(noteTypeStr) {
        setNote(prevNote => ({ ...prevNote, type: noteTypeStr }))
        setIsAddingNote(true)
    }

    function getNoteForm() {
        if (note.type === 'note-txt') {
            return (
                <section className="note-add-section">
                    <input onChange={handleInput} value={note.info.title} name="title" type="text" placeholder="Title" />
                    <input onChange={handleInput} value={note.info.txt} name="txt" type="text" placeholder="Take a note..." />
                    <div>
                        <button onClick={handleAddingNote}>Save</button>
                        <button onClick={onOpenForm}>Close</button>
                    </div>
                </section>
            )
        } else if (note.type === 'note-img' || note.type === 'note-video') {
            return (
                <section className="note-add-section">
                    <input onChange={handleInput} value={note.info.title} name="title" type="text" placeholder="Title" />
                    <input onChange={handleInput} value={note.info.url} name="url" type="text" placeholder="Url..." />
                    <div>
                        <button onClick={handleAddingNote}>Save</button>
                        <button onClick={onOpenForm}>Close</button>
                    </div>
                </section>
            )
        } else if (note.type === 'note-todos') {
            return (
                <section className="note-add-section">
                    <input onChange={handleInput} value={note.info.title} name="title" type="text" placeholder="Title" />
                    <input onChange={handleInput} value={note.info.todos.map(todo => todo.txt)} name="todos" type="text" placeholder="Todos (ex. Clean, Eat)..." />
                    <div>
                        <button onClick={handleAddingNote}>Save</button>
                        <button onClick={onOpenForm}>Close</button>
                    </div>
                </section>
            )
        }
    }

    return <section className="note-add">
        {!isAddingNote &&
            <span className="note-inputs">
                <input onClick={onOpenForm} name="txt" type="text" placeholder="Take a note..." />
                <span className="note-add-buttons">
                    <button onClick={() => setNoteType('note-img')} className="fa-solid image"></button>
                    <button onClick={() => setNoteType('note-video')} className="fa-brands youtube"></button>
                    <button onClick={() => setNoteType('note-todos')} className="fa-solid list"></button>
                </span>
            </span>
        }

        {isAddingNote && getNoteForm()}
    </section>
}