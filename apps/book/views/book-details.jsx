const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { bookService } from "../../../services/book.service.js"
import { utilService } from "../../../services/util.service.js"

import { LongText } from "../cmps/long-text.jsx"
import { AddReview } from "../cmps/add-review.jsx"
import { Review } from "../cmps/review.jsx"



export function BookDetails() {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const currentYear = utilService.getCurrentYear()
    const [prevBookId, setPrevBookId] = useState(null)
    const [nextBookId, setnextBookId] = useState(null)
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.getById(bookId)
            .then(setBook)
            .catch((err) => {
                console.log('Had issue in book details ', err)
                navigate('/book')
            })

        bookService.getPreviousBookId(bookId).then(setPrevBookId)
        bookService.getNextBookId(bookId).then(setnextBookId)
    }

    function onAddReview(book) {
        setBook({ ...book })
    }

    function onDeleteReview(reviewId) {
        bookService.deleteReview(bookId, reviewId)
            .then((book) => {
                showSuccessMsg('Deleted review')
                setBook({ ...book })
            })
    }

    if (!book) return <div>Loading...</div>
    return <section className="book-details">
        <button onClick={() => navigate('/book')}>Go back</button>
        <div className="prev-next-book flex space-between">
            <Link to={`/book/${prevBookId}`}>Previous book</Link>
            <Link to={`/book/${nextBookId}`}>Next book</Link>
        </div>

        {book.listPrice.isOnSale && <h2 className="green">ON SALE!</h2>}
        <p>By {book.authors.join(' ')}, language {book.language}, published {book.publishedDate}</p>

        {currentYear - book.publishedDate > 10 && <p>Vintage</p>}
        {currentYear - book.publishedDate < 1 && <p>New</p>}

        <h2>{book.title} - {book.pageCount} pages</h2>

        {book.pageCount < 100 && <p>Light reading</p>}
        {book.pageCount > 500 && <p>Serious reading</p> || book.pageCount > 200 && <p>Decent reading</p>}

        <LongText txt={book.description} length={30} />

        <img src={book.thumbnail || 'http://coding-academy.org/books-photos/20.jpg'} alt={book.title} />

        <h3 className={book.listPrice.amount < 20 ? "green" : book.listPrice.amount > 150 ? "red" : ""}>price {book.listPrice.amount} {book.listPrice.currencyCode}</h3>

        <AddReview bookId={bookId} onAddReview={onAddReview} />

        {book.reviews && <section className="reviews">
            {book.reviews.map(review => (
                <article key={review.id} className="review">
                    <Review key={review.id} review={review} bookId={bookId} onDeleteReview={onDeleteReview} />
                    <button onClick={() => onDeleteReview(review.id)}>Delete</button>
                </article>
            ))}
        </section>}

    </section>
}