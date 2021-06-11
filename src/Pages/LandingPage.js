import {Component} from "react";
import CardHolder from "../Components/CardHolder";
import MyCalendar from "../Components/MyCalendar";
import NavBar from "../Components/NavBar";
import Header from "../Components/Header";

export class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                <NavBar/>
                <Header />
                <MyCalendar/>
                <CardHolder databaseFlag=''/>
            </div>
        )
    }
}

export default LandingPage;