const {Fragment} = React

export function NoteVideo({ note }) {
    return <Fragment>
        <h3>{note.info.title}</h3>
        <iframe src={note.info.url} title={note.info.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </Fragment>
}