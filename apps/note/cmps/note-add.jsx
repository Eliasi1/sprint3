const { useState } = React

export function NoteAdd() {

    const [isAddingNote, setIsAddingNote] = useState(false)

    return <section className="note-add">
        {!isAddingNote && <input onClick={() => setIsAddingNote((prevIsAddingNote => !prevIsAddingNote))} type="text" placeholder="Take a note..." />}
        {isAddingNote && <section className="note-add-section">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Take a note..." />
            <div>
                <button onClick={() => setIsAddingNote((prevIsAddingNote => !prevIsAddingNote))}>Close</button>
            </div>
        </section>}
    </section>
}