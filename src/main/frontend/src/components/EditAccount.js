import React, {Component} from "react";

import NewEmail from "./NewEmail";
import NewName from "./NewName";
import NewPassword from "./NewPassword";
import UserData from "./UserData";
import {Form} from "react-bootstrap";


export default class EditAccount extends Component{

    render() {
        return(
            <div>
                <Form.Label>ef691692-805e-4d44-89f4-3bc0c38bcc00</Form.Label>

                <br/>
                <UserData/>
                <br/>
                <NewEmail/>
                <br/>
                <NewName/>
                <br/>
                <NewPassword/>
                <br/>
                <br/>
            </div>
        );
    };
}
