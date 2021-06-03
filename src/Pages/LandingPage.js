import {Component} from "react";
import CardHolder from "../Components/CardHolder";


export class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                <CardHolder databaseFlag=''/>
            </div>
        )
    }
}

export default LandingPage;