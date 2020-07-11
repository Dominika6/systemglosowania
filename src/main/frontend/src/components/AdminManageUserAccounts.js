import React, {Component} from "react";

import AdminAddUser from "./AdminAddUser";
import AdminGetAllUsers from "./AdminGetAllUsers";


export default class AdminManageUserAccounts extends Component{

    render() {
        return(
            <div>
                <AdminAddUser/>
                <AdminGetAllUsers/>
                <br/>
                <br/>
            </div>
        );
    };
}
