import React, {Component} from "react";

import AdminAddUser from "./AdminAddUser";
import AdminGetAllUsers from "./AdminGetAllUsers";
// import AdminDeleteUser from "./AdminDeleteUser";


export default class AdminManageUserAccounts extends Component{

    render() {
        return(
            <div>
                <AdminAddUser/>
                <br/>
                <AdminGetAllUsers/>
                <br/>
                {/*<AdminDeleteUser/>*/}
                <br/>
                <br/>
            </div>
        );
    };
}
