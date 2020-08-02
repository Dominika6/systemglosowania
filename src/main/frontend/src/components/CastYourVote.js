import React, {Component} from "react";


// import AddAnswer from "./AddAnswer";
// import MyAnswers from "./MyAnswers";
import TableOfAnswers from "./TableOfAnswers";
import Answers from "./Answers";

export default class CastYourVote extends Component{

    render() {
        return(
            <div>
                {/*<AddAnswer/>*/}
                {/*<MyAnswers/>*/}
                {/*<TableOfAnswers/>*/}
                <Answers/>
                <br/>
            </div>
        );
    };
}
