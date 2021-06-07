import {Component, useState} from "react";
import Constants from "../Constants";
import FullJournal from "./FullJournal";

// card view for individual journals
function Card(props){
    const [hasCoverImage, setHasCoverImage] = useState(true);
    const [showFullJournal, setShowFullJournal] = useState(false);

    // make sure hasCoverImage flag agrees with the journal
    if (hasCoverImage !== props.journal.CoverImage){
        setHasCoverImage(props.journal.CoverImage);
    }

    return (
        <div className='card' id={props.id}>
            <h2 className='JournalTitle'>{props.journal.Title}</h2>
            <p className='JournalDate'>{props.journal.Date}</p>
            {
                hasCoverImage &&
                <img src={props.journal.CoverImage}
                     alt='Not Available'
                     onError={(e)=>{e.target.src = Constants.BROKEN_IMAGE}} />
            }
            {
                hasCoverImage &&
                <p className='JournalContentWithCover'>{props.journal.Content}</p>
            }
            {
                !hasCoverImage &&
                <p className='JournalContentOnly'>{props.journal.Content}</p>
            }
            <button type='button'
                    className='ReadMore'
                    onClick={()=>setShowFullJournal(!showFullJournal)} >
                Read</button>

            <button type='button'
                    className='DeleteJournal'
                    onClick={props.deleteJournal} >
                Delete</button>

            {
                showFullJournal &&
                <FullJournal journal={props.journal}
                             hasCoverImage={hasCoverImage}
                             closePopup={()=>setShowFullJournal(!showFullJournal)}
                             editJournal={props.editJournal}
                             deleteJournal={props.deleteJournal}/>
            }
        </div>
    )
}

export default Card;