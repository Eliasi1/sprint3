import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteTxt } from "./note-txt.jsx"
import { NoteVideo } from "./note-video.jsx"

export function DynamicNote({ note, onToggleTodo }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt note={note} />
        case 'note-img':
            return <NoteImg note={note} />
        case 'note-video':
            return <NoteVideo note={note} />
        case 'note-todos':
            return <NoteTodos onToggleTodo={onToggleTodo} note={note} />
    }
}