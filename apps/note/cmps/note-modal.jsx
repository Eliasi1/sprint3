const { useState, useEffect } = React

import { utilService } from "../../../services/util.service.js"

export function NoteModal({ note, onCloseModal, onSaveNote, onRemoveNote }) {
    const [currNote, setCurrNote] = useState(null)

    useEffect(() => {
        setCurrNote({ ...note })
    }, [])

    function handleInput({ target }) {
        let { value, name: field } = target
        if (field === 'todos') {
            const todosTxts = value.split(',')
            setCurrNote((prevNote) => {
                todosTxts.forEach((todoStr, idx) => {
                    if (prevNote.info.todos[idx]) prevNote.info.todos[idx].txt = todoStr
                    else prevNote.info.todos.push({ txt: todoStr, doneAt: null })

                })
                return { ...prevNote, info: { ...prevNote.info, [field]: [...prevNote.info.todos] } }
            })
        } else {
            setCurrNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        }
    }

    function handleSavingNote() {
        const youtubeVidId = utilService.extractYoutubeVidId(currNote.info.url)
        if (youtubeVidId) currNote.info.url = `https://www.youtube.com/embed/${youtubeVidId}`
        onSaveNote(currNote)
        onCloseModal()
    }

    if (!currNote) return
    return <div className="note-modal note-add-section">
        <input onChange={handleInput} value={currNote.info.title} name="title" type="text" placeholder="Title" />
        {currNote.type === 'note-txt' && <input onChange={handleInput} value={currNote.info.txt} name="txt" type="text" placeholder="Note text..." />}
        {(currNote.type === 'note-img' || currNote.type === 'note-video') && <input onChange={handleInput} value={currNote.info.url} name="url" type="text" placeholder="Link..." />}
        {currNote.type === 'note-todos' && <input onChange={handleInput} value={currNote.info.todos.map(todo => todo.txt)} name="todos" type="text" placeholder="Todos..." />}
        <div>
            <button style={{marginRight: 'auto'}} title="Delete note" onClick={() => { onCloseModal(); onRemoveNote(note.id) }} className="fa-solid trash-can"></button>
            <button onClick={handleSavingNote}>Save</button>
            <button onClick={onCloseModal}>Close</button>
        </div>
    </div >
}