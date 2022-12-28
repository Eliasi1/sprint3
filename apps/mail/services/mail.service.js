export const mailService = {
    getMail
}

const Mails = [
    { id: 'e101', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, sentAt : 1551133930594, to: 'momo@momo.com' },
    { id: 'e102', subject: 'Thank you for contacting us', body: 'our team in bobMobile will look in this issue and contact you within a year', isRead: false, sentAt : 1551166430594, to: 'momo@momo.com' },
    { id: 'e103', subject: 'registration failed', body: 'i think you dont have enough money in the account, please find a job and try again', isRead: true, sentAt : 1553433930594, to: 'momo@momo.com' },
]

function getMail() {
    return Promise.resolve(Mails)
}