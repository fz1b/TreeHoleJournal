import Constants from "../Constants";


function FullJournal(props) {
    return (
        <div className='FullJournal'>
            <h2 className='JournalTitle'>{props.journal.Title}</h2>
            <button type='button' className='close' onClick={props.closePopup} >X</button>
            <p className='JournalDate'>{props.journal.Date}</p>
            {
                props.hasCoverImage &&
                <img src={props.journal.CoverImage}
                     alt='Not Available'
                     onError={(e)=>{e.target.src = Constants.BROKEN_IMAGE}} />
            }
            {
                props.hasCoverImage &&
                <p className='JournalContentWithCover'>{props.journal.Content}</p>
            }
            {
                !props.hasCoverImage &&
                <p className='JournalContentOnly'>{props.journal.Content}</p>
            }
            <button type='button' className='Edit'>Edit</button>
            <button type='button' className='Delete'>Delete</button>
            <button type='button' className='Privacy'>Change Privacy</button>
        </div>
    )
}

export default FullJournal;