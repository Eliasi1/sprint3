const {useNavigate} = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx";

export function BookList({ books, onDeleteBook }) {
    const navigate = useNavigate()

    return books.map(book => (
        <article key={book.id} className="card">
            <BookPreview book={book} />
            <button onClick={() => navigate(`/book/${book.id}`)}>Details</button>
            <button onClick={() => onDeleteBook(book.id)}>Delete</button>
        </article>
    ))
}