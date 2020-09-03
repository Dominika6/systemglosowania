import React, {Component} from "react";

import { Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faList} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


export default class AdminSurveyResults extends Component{

    constructor(props) {
        super(props);
        this.state = { surveys:[], answers:[]} ;
        this.idChange= this.idChange.bind(this);
    }

    componentDidMount() {
        this.findAllQuestions();
    }

    findAllQuestions(){
        axios.get("http://localhost:8080/api/survey/getResult")
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
            });
    }

    idChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {

        return(<>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp; Results</Card.Header>
                    <Card.Body>
                        <Table bordered hover stripped variant="dark">
                            <thead>
                            <tr>
                                <th>Question</th>
                                <th>Deadline</th>
                                <th>Yes</th>
                                <th>No</th>
                                <th>Votes cast</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.surveys.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"> No Surveys Available.</td>
                                </tr> :

                                this.state.surveys.map((survey) => {
                                    const total = survey.tru + survey.fals
                                    const percentageTru = (survey.tru/total*100).toFixed(2)
                                    const percentageFals = (survey.fals/total*100).toFixed(2)
                                    return <tr key={survey.id}>
                                        <td>{survey.question}</td>
                                        <td>{survey.deadline}</td>
                                        <td>{percentageTru} %&nbsp;&nbsp;({survey.tru})</td>
                                        <td>{percentageFals} %&nbsp;&nbsp;({survey.fals})</td>
                                        <td align={"center"}>{total}</td>
                                    </tr>
                                    }
                                )
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
            </Card>
            <br/>
            <br/>
            </>
        );
    };
}
