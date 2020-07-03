import React, {Component} from "react";

import {Form} from "react-bootstrap";

import NewEmail from "./NewEmail";
import NewName from "./NewName";
import NewPassword from "./NewPassword";
import UserData from "./UserData";


export default class AdminAccount extends Component{

    render() {
        return(
            <div>
                <Form.Label>7f5caae4-2977-4638-badb-ff190bf44d17</Form.Label>

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
