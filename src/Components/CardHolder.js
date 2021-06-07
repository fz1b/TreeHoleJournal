import {Component} from "react";
import Card from "./Card";
import DatabaseHandler from "../DatabaseHandler";

// Properties: database_flag
// a container to hold journal cards
export class CardHolder extends Component{
    constructor(props) {
        super(props);
        this.databaseFlag = this.props.databaseFlag;
        this.state={
            journals: this.pullFromDatabase(this.databaseFlag)
        };
    }

    render() {
        return (
            <div className='CardHolder'>
                <button type='button'
                        className='createJournal'
                        onClick={this.addJournal.bind(this)} >
                    Create New Journal</button>
                {this.state.journals.map((journal, index)=>{
                    return (
                        <Card
                            journal={journal}
                            id={journal.uniqueID}
                            editJournal={this.editJournal.bind(this, index)}
                            addJournal={this.addJournal.bind(this)}
                            deleteJournal={this.deleteJournal.bind(this, index)}
                        />
                    )
                })}
            </div>
        )
    };

    // pull all journals from the database
    pullFromDatabase() {
        // TODO:change to real flag once db is implemented
        return DatabaseHandler.pullFromDatabase(this.databaseFlag);
    };

    // modify a journal in the database
    editJournal(index, newJournal){
        // TODO: to be implemented
        alert('Not Implemented');
    }

    addJournal(journal) {
        // TODO: to be implemented
        alert('Not Implemented');
    }

    // delete a journal from the database
    deleteJournal(index) {
        // delete from fake database for now
        // TODO: send query to delete data from the database
        if (DatabaseHandler.deleteJournal(this.databaseFlag, index)) {
            let newJournals = Object.assign([], this.state.journals);
            newJournals.splice(index, 1);
            this.setState({journals:newJournals});
            return true;
        } else {
            alert('Failed to delete');
        }
    }
}

export default CardHolder;