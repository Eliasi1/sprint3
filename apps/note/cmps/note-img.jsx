const {Fragment} = React

export function NoteImg({ note }) {
    return <Fragment>
        <h3>{note.info.title}</h3>
        <img src={note.info.url} />
    </Fragment>
}