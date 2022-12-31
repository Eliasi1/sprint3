export function Review({ review }) {

    return <div>
        <h2>{review.fullName}</h2>
        <p>Gave a rating of {review.rating}</p>
        <p>Read at {review.readAt}</p>
    </div>

}