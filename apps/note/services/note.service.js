import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


export const noteService = {
    getNotes,
    getEmptyNote,
    save,
    remove
}

const STORAGE_KEY = 'notesDB'
_createDemoNotes()


function getNotes(queryStr) {
    return storageService.query(STORAGE_KEY).then(notes => {
        const regex = new RegExp(queryStr, 'i')
        return notes.filter(note => regex.test(note.info.title) || regex.test(note.info.txt))
    })
}

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function getEmptyNote() {
    return {
        type: 'note-txt',
        isPinned: false,
        info: {
            title: '',
            txt: ''
        }
    }
}

function _createDemoNotes() {
    let notes = utilService.loadFromStorage(STORAGE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!",
                    title: 'Some title'
                }
            },
            {
                id: "n102",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!",
                    title: 'Some title'
                }
            },
            {
                id: "n103",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!",
                    title: 'Some title'
                }
            },
            {
                id: "n104",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!",
                    title: 'Some title'
                }
            },
            {
                id: "n105",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!",
                    title: 'Some title'
                }
            },
            {
                id: "n106",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!",
                    title: 'Some title'
                }
            },
            {
                id: "n107",
                type: "note-img",
                info: {
                    url: "https://images.unsplash.com/photo-1672233834592-1d516d1c6265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1523&q=80",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n108",
                type: "note-video",
                info: {
                    url: "https://www.youtube.com/embed/h4VJGNNSQnw",
                    title: "HI VIDEO"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n109",
                type: "note-todos",
                info: {
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                }
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, notes)
}