import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    getMails,
    getMail,
    saveMail,
    saveDraft,
    sendMail,
    removeMail,
    toggleStarMail,
    getEmptyMail,
    createDraft
}

const MAILS_STORAGE_KEY = 'mailsDB'
const DRAFT_STORAGE_KEY = 'draftsDB'
_createDemoMails()
_createDemoDrafts()

const loggedinUser = { email: 'momo@momo.com', fullname: 'Mahatma Appsus' }



function saveDraft(mail) {
    console.log("save draft recieved:")
    console.log(mail)
    if (mail.id) {
        console.log("id found,updating existing draft ")
        return storageService.put(DRAFT_STORAGE_KEY, mail)
    } else {
        console.log("id not found,creating new draft ")
        return storageService.post(DRAFT_STORAGE_KEY, mail)
    }
}

function createDraft(dataTemplate=null) {
    if (!dataTemplate) return saveDraft(getEmptyMail())
    if (dataTemplate.to) {const to = dataTemplate.to} else {const to = '<no recipient>'}
    if (dataTemplate.subject) {const subject = dataTemplate.subject} else {const subject = '<no subject>'}
    if (dataTemplate.body) {const body = dataTemplate.body} else {const body = '<no body>'}
    return saveDraft ({...getEmptyMail,to,subject,body})

}

function sendMail(id) {
    console.log("sending mail with id ", id)
    storageService.query(DRAFT_STORAGE_KEY).then((mailList) => mailList.find((item) => item.id === id)).then((mail) => _addMail(mail))
    removeMail(id, 'draft')
}

function _addMail(mail) {
    console.log("adding the fillowing mail to mails storage")
    console.log(mail)
    storageService.query(MAILS_STORAGE_KEY).then((mails) => { mails.unshift(mail); return mails }).then((mails) => storageService.save(MAILS_STORAGE_KEY, mails))


}

function getMail(id) {
    let mail = storageService.query(MAILS_STORAGE_KEY).then((mails) => mails.find((mail) => mail.id === id))
    if (mail) { return mail }
    else {
        mail = storageService.query(DRAFT_STORAGE_KEY).then((mails) => mails.find((mail) => mail.id === id))
        if (mail) { return mail } else return "Mail not found"
    }

}

function getMails(filterBy) {
    filterBy.queryStr = filterBy.queryStr.toLowerCase()
    switch (filterBy.boxType) {
        case 'inbox':
            return storageService.query(MAILS_STORAGE_KEY).then((mails) => {
                return Promise.resolve(mails.filter((mail) => mail.to === loggedinUser.email && mail.subject.toLowerCase().includes(filterBy.queryStr)))
            })
        case 'sent':
            return storageService.query(MAILS_STORAGE_KEY).then((mails) => {
                return Promise.resolve(mails.filter((mail) => mail.to !== loggedinUser.email && mail.subject.toLowerCase().includes(filterBy.queryStr)))
            })
        case 'starred':
            return storageService.query(MAILS_STORAGE_KEY).then((mails) => {
                return Promise.resolve(mails.filter((mail) => mail.isStarred === true && mail.subject.toLowerCase().includes(filterBy.queryStr)))
            })
        case 'draft':
            return storageService.query(DRAFT_STORAGE_KEY).then((mails) => {
                return Promise.resolve(mails.filter((mail) => mail.subject.toLowerCase().includes(filterBy.queryStr)))
            })
    }

}

function _createDemoMails() {
    let mails = utilService.loadFromStorage(MAILS_STORAGE_KEY)
    if (!mails || !mails.length) {
        const mails = [
            { id: 'e101', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, sentAt: 1551133930594, to: 'momo@momo.com', isStarred: false },
            { id: 'e102', subject: 'Thank you for contacting us', body: 'our team in bobMobile will look in this issue and contact you within a year', isRead: false, sentAt: 1551166430594, to: 'momo@momo.com', isStarred: false },
            { id: 'e103', subject: 'registration failed', body: 'i think you dont have enough money in the account, please find a job and try again', isRead: true, sentAt: 1553433930594, to: 'momo@momo.com', isStarred: false },
            { id: 'e104', subject: 'registration failed??', body: 'why like this??!', isRead: true, sentAt: 1553433930594, to: 'Vicky@Vicky.com', isStarred: false },
            { id: 'e105', subject: 'Miss you too kapara', body: 'lets set up a meeting that we know we will never attent to!', isRead: true, sentAt: 1553433930594, to: 'tommy@tommy.com', isStarred: true },
            { id: 'e106', subject: 'flowers order', body: 'hi, bring me flowers', isRead: true, sentAt: 1553433930594, to: 'elchanan@elchanan.com', isStarred: false },
            { id: 'e107', subject: 'food order', body: 'ok cancel the flowers, i want food.', isRead: true, sentAt: 1553433930594, to: 'elchanan@elchanan.com', isStarred: false },
        ]
        utilService.saveToStorage(MAILS_STORAGE_KEY, mails)
    }
}
function _createDemoDrafts() {
    let mails = utilService.loadFromStorage(DRAFT_STORAGE_KEY)
    if (!mails || !mails.length) {
        const mails = []
        utilService.saveToStorage(DRAFT_STORAGE_KEY, mails)
    }
}

function saveMail(mail) {
    if (mail.id) {
        return storageService.put(MAILS_STORAGE_KEY, mail)
    } else {
        return storageService.post(MAILS_STORAGE_KEY, mail)
    }
}

function removeMail(mailId, boxType) {
    console.log(boxType)
    switch (boxType) {
        case 'mails':
            return storageService.remove(MAILS_STORAGE_KEY, mailId)
        case 'draft':
            return storageService.remove(DRAFT_STORAGE_KEY, mailId)


    }
}

function toggleStarMail(id) {
    return storageService.query(MAILS_STORAGE_KEY).then((mails) => {
        const mail = mails.find((mail) => mail.id === id)
        mail.isStarred = !mail.isStarred
        return mailService.saveMail(mail)
    })
}

function getEmptyMail() {
    return { id: null, subject: '<no subject>', to: '<no recipient>', body: '<no body>', sentAt: '', isRead: false, isStarred: false, sentAt: Date.now() }
}



















