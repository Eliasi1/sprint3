const { Fragment } = React

export function NoteTodos({ note }) {
    return <Fragment>
        <h3>{note.info.title}</h3>
        <ul>
            {note.info.todos.map((todo, idx) => (
                <li key={todo.txt + idx}>{todo.txt}</li>
            ))}
        </ul>
    </Fragment>
}