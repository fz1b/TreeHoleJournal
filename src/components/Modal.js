import React from 'react';
import '../stylesheets/modal.css';

export default function Modal(prop) {
    return (
        <>
            <div className='modal display-block'>
                <section className='modal-main'>
                    <img className='modal-image' src={prop.details.image}></img>
                    <h3 className='description'>{prop.details.name}</h3>
                    <div className='description location'>
                        {' '}
                        {prop.details.location}
                    </div>
                    <div className='description'>
                        {prop.details.description}
                    </div>
                    <button
                        onClick={() => prop.action()}
                        className='ui mini button back'
                    >
                        Close
                    </button>
                </section>
            </div>
        </>
    );
}
