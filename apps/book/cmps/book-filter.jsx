const { useState } = React

import { bookService } from "../../../services/book.service.js"

export function BookFilter({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    function handleFilter({ target }) {
        let { value, name, type } = target
        value = type === 'number' ? +value : value
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, [name]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    return <div>
        <form onSubmit={onSubmitFilter}>
            <input type="text" name="title" placeholder="Search book" value={filterBy.title} onChange={handleFilter} />
            <input type="number" name="maxPrice" placeholder="Max price" value={filterBy.maxPrice} onChange={handleFilter} />
            <button>Filter</button>
        </form>
    </div>
}