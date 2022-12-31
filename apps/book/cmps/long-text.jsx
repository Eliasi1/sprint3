const {useState} = React

export function LongText({txt, length}) {
    length = length ? length : 100

    const [isShowAll, setIsShowAll] = useState(false)

    return <div className="long-text">
        {isShowAll && <span>{txt}</span> || txt && <span>{txt.slice(0 , length)}...</span>}
        {txt && txt.length > length && <button onClick={() => setIsShowAll((prevIsShowAll => !prevIsShowAll))}>{isShowAll ? 'Show less' : 'Show more'}</button>}
    </div>
}