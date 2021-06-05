import {Component, useState} from "react";
import Constants from "../Constants";


function Card(props){
    const [hasCoverImage, setHasCoverImage] = useState(true);

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
                <img src={props.journal.CoverImage} alt='Image Not Available'  onError={(e)=>{e.target.src = Constants.BROKEN_IMAGE}} />
            }
            {
                hasCoverImage &&
                <p className='JournalContentWithCover'>{props.journal.Content}</p>
            }
            {
                !hasCoverImage &&
                <p className='JournalContentOnly'>{props.journal.Content}</p>
            }
            <button type='button' className='ReadMore'>Read</button>
            <button type='button' onClick={props.deleteJournal} className='DeleteJournal'>Delete</button>
        </div>
    )
}

export default Card;