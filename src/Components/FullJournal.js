import Constants from "../Constants";
import {Component} from "react";


export class FullJournal extends Component{

    render(){
        return (
            <div className='FullJournal'>
                <h2 className='JournalTitle'>{this.props.journal.Title}</h2>
                <button type='button' className='close' onClick={this.props.closePopup} >X</button>
                <p className='JournalDate'>{this.props.journal.Date}</p>
                {
                    this.props.hasCoverImage &&
                    <img src={this.props.journal.CoverImage}
                         alt='Not Available'
                         onError={(e)=>{e.target.src = Constants.BROKEN_IMAGE}} />
                }
                {
                    this.props.hasCoverImage &&
                    <p className='JournalContentWithCover'>{this.props.journal.Content}</p>
                }
                {
                    !this.props.hasCoverImage &&
                    <p className='JournalContentOnly'>{this.props.journal.Content}</p>
                }
                <button type='button' className='Edit' onClick={this.editJournal.bind(this)}>Edit</button>
                <button type='button' className='Delete' onClick={this.deleteJournal.bind(this)}>Delete</button>
                <button type='button' className='Privacy' onClick={this.changePrivacySettings.bind(this)}>Change Privacy Settings</button>
                <button type='button' className='Share' onClick={this.share.bind(this)}>Share</button>
            </div>
        )
    }

    editJournal() {
        // TODO: to be implemented
        alert('TO BE IMPLEMENTED');
    }

    deleteJournal() {
        if(this.props.deleteJournal()) {
            this.props.closePopup();
        }
    }

    changePrivacySettings(){
        // TODO: to be implemented
        alert('TO BE IMPLEMENTED');
    }

    share(){
        // TODO: to be implemented
        alert('TO BE IMPLEMENTED');
    }
}

export default FullJournal;