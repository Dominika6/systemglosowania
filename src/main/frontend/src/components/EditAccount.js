import React, {Component} from "react";

import NewEmail from "./NewEmail";
import NewName from "./NewName";
import NewPassword from "./NewPassword";
import UserData from "./UserData";


export default class EditAccount extends Component{

    render() {
        return(
            <div>
                <UserData/>
                <NewEmail/>
                <NewName/>
                <NewPassword/>
                <br/>
                <br/>
            </div>
        );
    };
}
