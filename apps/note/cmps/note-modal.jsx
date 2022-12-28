const { useState, useEffect } = React

export function NoteModal({ note, onCloseModal, onSaveNote }) {
    const [currNote, setCurrNote] = useState(null)

    useEffect(() => {
        setCurrNote(note)
    }, [])

    console.log(currNote)

    function handleInput({ target }) {
        let { value, name: field } = target
        setCurrNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function handleSavingNote(){
        onSaveNote(currNote)
        onCloseModal()
    }

    if (!currNote) return
    return <div className="note-modal note-add-section">
        <input onChange={handleInput} value={currNote.info.title} name="title" type="text" placeholder="Title" />
        <input onChange={handleInput} value={currNote.info.txt} name="txt" type="text" placeholder="Take a note..." />
        <div>
            <button onClick={handleSavingNote}>Save</button>
            <button onClick={onCloseModal}>Close</button>
        </div>
    </div>
}