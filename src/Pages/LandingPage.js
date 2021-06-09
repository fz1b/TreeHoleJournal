import {Component} from "react";
import CardHolder from "../Components/CardHolder";
import Calendar from "../Components/Calender";

export class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                <h1>Treehole v0.0.0</h1>
                <Calendar/>
                <CardHolder databaseFlag=''/>
            </div>
        )
    }
}

export default LandingPage;