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
        return notes.filter(note => regex.test(note.info.title) || regex.test(note.info.txt) || (note.info.todos && regex.test(note.info.todos.map(todo => todo.txt).join(''))))
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
                type: "note-img",
                isPinned: false,
                info: {
                    title: "Italy",
                    txt: "",
                    url: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80",
                    todos: []
                },
                id: "GV3yb"
            },
            {
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Holiday",
                    txt: "Never",
                    url: "",
                    todos: []
                },
                id: "ZPNK9"
            },
            {
                type: "note-todos",
                isPinned: false,
                info: {
                    title: "Appsus",
                    txt: "",
                    url: "",
                    todos: [
                        {
                            txt: "hi",
                            doneAt: null
                        },
                        {
                            txt: "there",
                            doneAt: null
                        },
                        {
                            txt: "my",
                            doneAt: null
                        },
                        {
                            txt: "name",
                            doneAt: null
                        },
                        {
                            txt: "is",
                            doneAt: null
                        },
                        {
                            txt: "shay",
                            doneAt: null
                        }
                    ]
                },
                id: "AodBx",
                style: {
                    backgroundColor: "#720808",
                    color: "white"
                }
            },
            {
                type: "note-video",
                isPinned: true,
                info: {
                    title: "Good song",
                    txt: "",
                    url: "https://www.youtube.com/embed/FPjJW5iTFN0",
                    todos: []
                },
                id: "kktSm",
                style: {
                    backgroundColor: "#212121",
                    color: "white"
                }
            },
            {
                type: "note-img",
                isPinned: false,
                info: {
                    title: "Happy new year!",
                    txt: "",
                    url: "https://images.unsplash.com/photo-1672339040081-7c139055ada6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    todos: []
                },
                id: "srb9F"
            },
            {
                type: "note-txt",
                isPinned: true,
                info: {
                    title: "Important",
                    txt: "REFUEL THE CAR",
                    url: "",
                    todos: []
                },
                id: "oeMFy",
                style: {
                    backgroundColor: "#3e163d",
                    color: "white"
                }
            },
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Don't forget to give Spin a snack",
                    title: "Important"
                },
                style: {
                    backgroundColor: "#3E163D",
                    color: "#ffffff"
                }
            },
            {
                id: "n102",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "123456grandma",
                    title: "My gmail password"
                }
            },
            {
                id: "n103",
                type: "note-video",
                isPinned: false,
                info: {
                    title: "BIG SAD ;(",
                    url: "https://www.youtube.com/embed/h4VJGNNSQnw"
                },
                style: {
                    backgroundColor: "#4f008f",
                    color: "white"
                }
            },
            {
                id: "n104",
                type: "note-todos",
                isPinned: false,
                info: {
                    title: "Grocery list",
                    todos: [
                        {
                            txt: "Chicken",
                            doneAt: null
                        },
                        {
                            txt: "Vegetables",
                            doneAt: null
                        },
                        {
                            txt: "Fruits",
                            doneAt: null
                        },
                        {
                            txt: "Rice",
                            doneAt: null
                        }
                    ]
                },
                style: {
                    backgroundColor: "#161F3E",
                    color: "#ffffff"
                }
            },
            {
                id: "n105",
                type: "note-img",
                isPinned: false,
                info: {
                    title: "Make my own burger",
                    url: "https://images.unsplash.com/photo-1672078857105-a1229a7033b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                }
            },
            {
                id: "n106",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Logitech G Pro X Superlight",
                    title: "Mouse to buy"
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
                    backgroundColor: "#e0ffff"
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
                    backgroundColor: "#693421",
                    color: "#ffffff"
                }
            },
            {
                id: "n109",
                type: "note-todos",
                info: {
                    title: "TODO LIST",
                    todos: [
                        {
                            txt: "Study",
                            doneAt: 1672412871706
                        },
                        {
                            txt: "Spin walk",
                            doneAt: null
                        },
                        {
                            txt: "Gym",
                            doneAt: null
                        }
                    ]
                }
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, notes)
}