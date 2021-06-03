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
                {this.state.journals.map((journal,index)=>{
                    return (
                        <Card journal={journal}/>
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
                Title: 'The First Journal',
                Date: '',
                EditDate: '',
                CoverImage: 'https://news.ubc.ca/wp-content/uploads/2019/04/UBC.jpg',
                Content: 'This is the first Journal',
            },
            {
                Title: 'The Second Journal',
                Date: '',
                EditDate: '',
                CoverImage: 'https://applyzones.com/uploads/schools/university-of-british-columbia-ubc/az-university-of-british-columbia-3.jpg',
                Content: 'This is the Second Journal',
            },
        ];
        return newDatabase;
    };

}

export default CardHolder;