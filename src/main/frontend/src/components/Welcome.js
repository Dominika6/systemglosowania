import React, {Component} from "react";
import Card from "react-bootstrap/Card";


export default class Welcome extends Component{

    render() {
        return(
            <Card className={"bg-dark text-white p-5"}>
                <h1>Hello User!</h1>
                <p>
                    Welcome to the Voting Application. If this is your first time here, read the following instructions.
                </p>
                <p>
                    ...
                </p>
            </Card>
        );
    }
}
