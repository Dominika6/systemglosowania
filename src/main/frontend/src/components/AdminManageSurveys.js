import React, {Component} from "react";

import AdminAddQuestion from "./AdminAddQuestion";
import ViewSurveys from "./ViewSurveys";


export default class AdminManageUserAccounts extends Component{

    render() {
        return(
        <div>
                <AdminAddQuestion/>
                <ViewSurveys/>
                <br/>
                <br/>
            </div>
        );
    };
}
