import {Component} from "react";
import CardHolder from "../Components/CardHolder";
import Calendar from "../Components/Calender";
import NavBar from "../Components/NavBar";
import Header from "../Components/Header";

export class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                <NavBar/>
                <Header />
                <Calendar/>
                <CardHolder databaseFlag=''/>
            </div>
        )
    }
}

export default LandingPage;