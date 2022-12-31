export function BookPreview({ book }) {
    return <div>
        <h2>{book.title}</h2>
        <img src={book.thumbnail || 'http://coding-academy.org/books-photos/20.jpg'} alt={book.title} />
        <h3>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
    </div>
}