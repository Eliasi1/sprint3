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
            txt: '',
            url: '',
            todos: []
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
                isPinned: false,
                info: {
                    txt: "Don't forget to give Spin a snack",
                    title: "Important"
                }
            },
            {
                id: "n102",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "123456grandma",
                    title: 'My gmail password'
                }
            },
            {
                id: "n103",
                type: "note-video",
                isPinned: false,
                info: {
                    title: "BIG SAD ;(",
                    url: 'https://www.youtube.com/embed/h4VJGNNSQnw'
                }
            },
            {
                id: "n104",
                type: "note-todos",
                isPinned: false,
                info: {
                    title: 'Grocery list',
                    todos: [
                        { txt: "Chicken", doneAt: null },
                        { txt: "Vegetables", doneAt: null },
                        { txt: "Fruits", doneAt: null },
                        { txt: "Rice", doneAt: null }
                    ]
                }
            },
            {
                id: "n105",
                type: "note-img",
                isPinned: false,
                info: {
                    title: 'Make my own burger',
                    url: 'https://images.unsplash.com/photo-1672078857105-a1229a7033b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80'
                }
            },
            {
                id: "n106",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Logitech G Pro X Superlight",
                    title: 'Mouse to buy'
                }
            },
            {
                id: "n107",
                type: "note-img",
                info: {
                    url: "https://images.unsplash.com/photo-1672233834592-1d516d1c6265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1523&q=80",
                    title: "A nice image"
                },
                style: {
                    backgroundColor: "lightcyan"
                }
            },
            {
                id: "n108",
                type: "note-video",
                info: {
                    url: "https://www.youtube.com/embed/xuxWlWkxLDQ",
                    title: "VERY MUSIC, much good"
                },
                style: {
                    backgroundColor: "royalblue"
                }
            },
            {
                id: "n109",
                type: "note-todos",
                info: {
                    title: "TODO LIST",
                    todos: [
                        { txt: "Study", doneAt: null },
                        { txt: "Spin walk", doneAt: null },
                        { txt: "Gym", doneAt: null }
                    ]
                }
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, notes)
}