import {Component} from "react";
import CardHolder from "../Components/CardHolder";
import Calendar from "../Components/Calender";
import Header from "../Components/Header";

export class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                <Header />
                <Calendar/>
                <CardHolder databaseFlag=''/>
            </div>
        )
    }
}

export default LandingPage;