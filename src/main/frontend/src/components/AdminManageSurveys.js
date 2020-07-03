import React, {Component} from "react";

import AdminAddQuestion from "./AdminAddQuestion";
import ViewSurveys from "./ViewSurveys";
import AdminDeleteQuestion from "./AdminDeleteQuestion";


export default class AdminManageUserAccounts extends Component{

    render() {
        return(
        <div>
                <AdminAddQuestion/>
                <br/>
                <ViewSurveys/>
                <br/>
                <AdminDeleteQuestion/>
                <br/>
                <br/>
            </div>
        );
    };
}
