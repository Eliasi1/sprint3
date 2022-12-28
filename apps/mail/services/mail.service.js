export const mailService = {
    getMail
}

const loggedinUser = { email: 'momo@momo.com', fullname: 'Mahatma Appsus' }

const mails = [
    { id: 'e101', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, sentAt : 1551133930594, to: 'momo@momo.com', isStarred: false },
    { id: 'e102', subject: 'Thank you for contacting us', body: 'our team in bobMobile will look in this issue and contact you within a year', isRead: false, sentAt : 1551166430594, to: 'momo@momo.com', isStarred: false },
    { id: 'e103', subject: 'registration failed', body: 'i think you dont have enough money in the account, please find a job and try again', isRead: true, sentAt : 1553433930594, to: 'momo@momo.com', isStarred: false },
    { id: 'e104', subject: 'registration failed??', body: 'why like this??!', isRead: true, sentAt : 1553433930594, to: 'Vicky@Vicky.com', isStarred: false },
    { id: 'e105', subject: 'Miss you too kapara', body: 'lets set up a meeting that we know we will never attent to!', isRead: true, sentAt : 1553433930594, to: 'tommy@tommy.com', isStarred: false },
    { id: 'e106', subject: 'flowers order', body: 'hi, bring me flowers', isRead: true, sentAt : 1553433930594, to: 'elchanan@elchanan.com', isStarred: false },
    { id: 'e107', subject: 'food order', body: 'ok cancel the flowers, i want food.', isRead: true, sentAt : 1553433930594, to: 'elchanan@elchanan.com', isStarred: false },
]

const drafts = []

function filterEmails (){}

function getMail(type='inbox') {
    switch (type){
        case 'inbox':
            return Promise.resolve(mails.filter((mail)=> mail.to === loggedinUser.email))
            case 'sent':
            return Promise.resolve(mails.filter((mail)=> mail.to !== loggedinUser.email))
            case 'starred':
            return Promise.resolve(mails.filter((mail)=> mail.to !== loggedinUser.email))
            case 'draft':
            return Promise.resolve(drafts)
    }
}