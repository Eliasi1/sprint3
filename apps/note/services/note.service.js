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


function getNotes() {
    return storageService.query(STORAGE_KEY)
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

        ]
    }
    utilService.saveToStorage(STORAGE_KEY, notes)
}