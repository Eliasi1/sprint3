const { Fragment } = React

export function NoteTodos({ note, onToggleTodo }) {
    return <Fragment>
        <h3>{note.info.title}</h3>
        <ul>
            {note.info.todos.map((todo, idx) => (
                <li className={todo.doneAt ? 'todo-done' : ''} onClick={(ev) => onToggleTodo(ev, todo, note)} key={todo.txt + idx}>{todo.txt}</li>
            ))}
        </ul>
    </Fragment>
}