import React, {Component} from "react";


import AddAnswer from "./AddAnswer";
import MyAnswers from "./MyAnswers";

export default class CastYourVote extends Component{

    render() {
        return(
            <div>
                <AddAnswer/>
                <MyAnswers/>
                <br/>
            </div>
        );
    };
}
