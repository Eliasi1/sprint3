const {Fragment} = React

export function NoteTxt({ note }) {
    return <Fragment>
        <h3>{note.info.title}</h3>
        <p>{note.info.txt || 'Empty note'}</p>
    </Fragment>
}