const { useState, useEffect } = React

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
        const elClassList = ev.target.classList
        if (ev.target.name) return
        setIsAddingNote(false)

    }

    function onOpenForm(ev) {
        ev.stopPropagation()
        setIsAddingNote((prevIsAddingNote => !prevIsAddingNote))
    }

    function handleInput({ target }) {
        let { value, name: field } = target
        setNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function handleAddingNote() {
        onAddNote(note)
        setNote(noteService.getEmptyNote())
    }

    return <section className="note-add">
        {!isAddingNote &&
            <span>
                <input onClick={onOpenForm} name="txt" type="text" placeholder="Take a note..." /><button>X</button>
            </span>
        }
        
        {isAddingNote &&
            <section className="note-add-section">
                <input onChange={handleInput} value={note.info.title} name="title" type="text" placeholder="Title" />
                <input onChange={handleInput} value={note.info.txt} name="txt" type="text" placeholder="Take a note..." />
                <div>
                    <button onClick={handleAddingNote}>Save</button>
                    <button onClick={onOpenForm}>Close</button>
                </div>
            </section>
        }
    </section>
}