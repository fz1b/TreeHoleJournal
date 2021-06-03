import {Component} from "react";
import Card from "./Card";

// Properties: database_flag
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
                {this.state.journals.map((journal)=>{
                    return (
                        <Card journal={journal} id={journal.uniqueID}/>
                    )
                })}
            </div>
        )
    };

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
                Content: 'This is the first Journal',
            },
            {
                uniqueID: '222',
                Title: 'The Second Journal',
                Date: '2021.06.03',
                EditDate: '',
                CoverImage: '',
                Content: 'This is the Second Journal',
            },
            {
                uniqueID: '333',
                Title: 'The Third Journal',
                Date: '',
                EditDate: '',
                CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                Content: 'This is the Third Journal',
            },
        ];
        return newDatabase;
    };

}

export default CardHolder;