const { useState, useEffect } = React

export function NoteAdd() {

    const [isAddingNote, setIsAddingNote] = useState(false)

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick)

        return () => {
            document.body.removeEventListener('click', handleBodyClick)
        }
    }, [])

    function handleBodyClick(ev) {
        setIsAddingNote(false)
    }

    function onOpenForm(ev) {
        ev.stopPropagation()
        setIsAddingNote((prevIsAddingNote => !prevIsAddingNote))
    }

    return <section className="note-add">
        {!isAddingNote && <input onClick={onOpenForm} type="text" placeholder="Take a note..." />}
        {isAddingNote && <section className="note-add-section">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Take a note..." />
            <div>
                <button onClick={onOpenForm}>Close</button>
            </div>
        </section>}
    </section>
}