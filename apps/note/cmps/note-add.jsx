const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd({onAddNote}) {

    const [isAddingNote, setIsAddingNote] = useState(false)
    const [note, setNote] = useState(noteService.getEmptyNote())

    console.log(note)

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick)

        return () => {
            document.body.removeEventListener('click', handleBodyClick)
        }
    }, [])

    function handleBodyClick(ev) {
        if (ev.target.classList.contains('notes-container') || ev.target === document.body) {
            setIsAddingNote(false)
        }
    }

    function onOpenForm(ev) {
        ev.stopPropagation()
        setIsAddingNote((prevIsAddingNote => !prevIsAddingNote))
    }

    function handleInput({ target }) {
        let { value, name: field } = target
        setNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    return <section className="note-add">
        {!isAddingNote && <input onClick={onOpenForm} name="txt" type="text" placeholder="Take a note..." />}
        {isAddingNote && <section className="note-add-section">
            <input onChange={handleInput} value={note.info.title} name="title" type="text" placeholder="Title" />
            <input onChange={handleInput} value={note.info.txt} name="txt" type="text" placeholder="Take a note..." />
            <div>
                <button onClick={() => onAddNote(note)}>Save</button>
                <button onClick={onOpenForm}>Close</button>
            </div>
        </section>}
    </section>
}