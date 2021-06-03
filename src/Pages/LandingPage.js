import {Component} from "react";
import CardHolder from "../Components/CardHolder";


export class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                <h1>Treehole v0.0.0</h1>
                <CardHolder databaseFlag=''/>
            </div>
        )
    }
}

export default LandingPage;