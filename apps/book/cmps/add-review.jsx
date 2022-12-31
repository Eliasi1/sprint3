const { useState } = React

import { bookService } from "../../../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const [isAddingReview, setIsAddingReview] = useState(false)

    function handleInput({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
            .then((book) => {
                setIsAddingReview(false)
                onAddReview(book)
                showSuccessMsg('Review added successfully')
            })
    }

    return <section className="add-review">
        {isAddingReview && <div>
            <form onSubmit={onSubmitReview}>
                <label htmlFor="fullname">Full name </label>
                <input onChange={handleInput} id="fullname" required type="text" name="fullName" placeholder="Your full name..." value={review.fullname} />

                <label htmlFor="rating">Rate the book </label>
                <input onChange={handleInput} id="rating" required type="number" name="rating" step="1" min="1" max="5" placeholder="Rating" value={review.rating} />

                <label htmlFor="date">Read at </label>
                <input onChange={handleInput} required id="date" type="date" name="readAt" value={review.readAt} />
                <button>Post</button>
            </form>
        </div>}
        <button onClick={() => setIsAddingReview((prevIsAddingReview) => !prevIsAddingReview)}>{isAddingReview ? 'Close' : 'Add review'}</button>
    </section>
}