import {Component} from "react";
import Card from "./Card";

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
                {this.state.journals.map((journal, index)=>{
                    return (
                        <Card
                            journal={journal}
                            id={journal.uniqueID}
                            deleteJournal={this.deleteJournal.bind(this,index)}
                        />
                    )
                })}
            </div>
        )
    };

    // pull all journals from the database
    pullFromDatabase(databaseFlag) {
        // fake database for now
        // TODO: implement the function to pull data from the database
        let newDatabase = [
            {
                uniqueID: '111',
                Title: 'The First Journal',
                Date: '2021.06.03',
                EditDate: '',
                CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                Content: 'This is the first Journal with an image',
            },
            {
                uniqueID: '222',
                Title: 'The Second Journal without an image',
                Date: '2021.06.03',
                EditDate: '',
                CoverImage: '',
                Content: 'This is the Second Journal without a cover image. There should NOT be a img tag',
            },
            {
                uniqueID: '333',
                Title: 'The Third Journal',
                Date: '',
                EditDate: '',
                CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                Content: 'This is the Third Journal with an image',
            },
            {
                uniqueID: '444',
                Title: 'The Forth Journal with a broken image',
                Date: '',
                EditDate: '',
                CoverImage: 'https://media.sproutsocia8/04/Facebook-Cover-Photo-Size.png',
                Content: 'This is the Forth Journal with a broken, the standard broken image replacement should be displayed',
            },
            {
                uniqueID: '555',
                Title: 'The Fifth Journal',
                Date: '',
                EditDate: '',
                CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                Content: 'This is the Fifth Journal with an image',
            },
        ];
        return newDatabase;
    };

    // delete a journal from the database
    deleteJournal(index) {
        // delete from fake database for now
        // TODO: implement the function to delete data from the database
        let newJournals = Object.assign([], this.state.journals);
        newJournals.splice(index, 1);
        this.setState({journals:newJournals});
    }

}

export default CardHolder;