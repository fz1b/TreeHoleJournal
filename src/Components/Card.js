import {Component, useState} from "react";


function Card(props) {
    const [hasCover, setHasCover] = useState(true);

    return (
        <div className='card' id={props.id}>
            <h2>{props.journal.Title}</h2>
            <p>{props.journal.Date}</p>
            {hasCover && <img src={props.journal.CoverImage}  alt='' onError={()=>{setHasCover(false)}} /> }
            {hasCover && <p className='hasCover'>{props.journal.Content}</p>}
            {!hasCover && <p className='noCover'>{props.journal.Content}</p>}
            <button type='button'>Read</button>
            <button type='button'>Delete</button>
        </div>
    )
}

export default Card;