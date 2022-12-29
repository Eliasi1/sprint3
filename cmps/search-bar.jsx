const { useState } = React

export function SearchBar({ onSearch }) {
    const [queryStr, setQueryStr] = useState('')

    function handleInput({ target }) {
        const { value } = target
        setQueryStr(value)
        onSearch(value)
    }

    return <section className="search-bar">
        <input value={queryStr} onChange={handleInput} type="text" placeholder="Search..." />
    </section>
}