import { storageService } from "./async-storage.service.js"
import { bookService } from "./book.service.js"

const STORAGE_KEY = 'booksDB'

export const googleBookService = {
    addGoogleBook,
    getGoogleBooks
}

function addGoogleBook(googleBook) {
    return bookService.getBooks().then(books => {
        const existingBook = books.find(book => book.id === googleBook.id)
        if (!existingBook) return storageService.post(STORAGE_KEY, googleBook)
        else {
            console.log('existing book')
            return existingBook
        }
    })
}

function getGoogleBooks(bookName) {
    return fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookName)
        .then(res => res.json())
        .then(res => {
            const books = res.items.map(book => {
                let bookThumbnail
                if (book.volumeInfo.imageLinks) {
                    bookThumbnail = book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail
                } else {
                    bookThumbnail = 'http://coding-academy.org/books-photos/16.jpg'
                }
                return {
                    id: book.id,
                    title: book.volumeInfo.title,
                    subtitle: book.volumeInfo.subtitle || '',
                    authors: book.volumeInfo.authors,
                    publishedDate: book.volumeInfo.publishedDate,
                    description: book.volumeInfo.description,
                    pageCount: book.volumeInfo.pageCount,
                    categories: book.volumeInfo.categories,
                    thumbnail: bookThumbnail,
                    language: book.volumeInfo.language,
                    listPrice: {
                        amount: 100,
                        currencyCode: 'EUR',
                        isOnSale: false
                    }
                }
            })
            return books
        })
}