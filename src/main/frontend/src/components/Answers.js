import React, {Component} from "react";

import {Button, Card, Col, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUser1, getCurrentUserId} from "./Login";

export default class Answers extends Component{

    constructor(props) {
        super(props);
        this.state = { questions:[], answers:[] };
        this.idChange= this.idChange.bind(this);
        // this.parsing= this.parsing.bind(this);
        this.findMyAnswers= this.findMyAnswers.bind(this);
        // this.ifExist= this.ifExist.bind(this);
        // this.ifAnswerExist= this.ifAnswerExist.bind(this);
    }

    componentDidMount() {
        this.findAllQuestions();
        this.findMyAnswers();
    }

    findAllQuestions(){
        console.log(" findAllQuestions()")
        axios.get("http://localhost:8080/api/questions/getAllQuestions")
            .then(response => response.data)
            .then((data) => {
                this.setState({questions : data});
                console.log("find questions: ", data)
            });
    }

    findMyAnswers(){
        const userid = getCurrentUserId();
        if (!userid) {
            alert('niezalogowany');
            return;
        }
        axios.get("http://localhost:8080/api/survey/getMyAnswers/" + userid)
            .then(response => response.data)
            .then((data) => {
                this.setState({answers : data});
                console.log("W findMyAnswers: ", data)
            });
    }

    submitAnswer = (event, qid, selectedOption) => {
        const userid = getCurrentUserId();
        if (!userid) {
            alert('niezalogowany');
            return;
        }
        event.preventDefault()
        // console.log( userid + "/" + this.state.qid +"/"+ this.state.selectedOption)
        axios.post("http://localhost:8080/api/survey/addAnswer/" + userid + "/" + qid +"/"+ selectedOption)
            .then(response => {
                alert(response.data);
                window.location.reload();
            });
    }


    // ifAnswerExist = () =>{
    //     const userid = getCurrentUserId();
    //
    //     if (!userid) {
    //         alert('niezalogowany');
    //         return;
    //     }
    //     // event.preventDefault()
    //     axios.get("http://localhost:8080/api/survey/ifAnswetExist/" + this.state.userid + "/" + this.state.qid)
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({answer : data});
    //         });
    // }

    // ifExist(qid){
    //     const user = getCurrentUser1();
    //     if (!user) {
    //         alert('niezalogowany');
    //         return;
    //     }
    //     // event.preventDefault()
    //     console.log("ifExist")
    //     console.log("qid: ", qid)
    //     axios.get("http://localhost:8080/api/survey/ifExist/" + user.id + "/" + qid)
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({if_exist : data});
    //             console.log("W ifExist: ", data)
    //         });
    // }
    // parsedData;
    // parsing() {
    //     var data = this.state.answers;
    //     console.log('data: ', data[0].qid)
    //     this.parsedData = JSON.parse(this.state.answers[0]);
    //     console.log("parsed data: ", this.parsedData[0])
    // }

    idChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    // const answersJson = this.state.answers.map((answers) => (key))


    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp;My Answers</Card.Header>
                {/*<Form id="myAnswersList" onSubmit={this.findMyAnswers}>*/}
                <Card.Body>

                    <Table bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Question</th>
                            <th>Deadline</th>
                            <th>Answer</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {/*<button className="btn" onClick={this.parse}>button</button>*/}



                        {this.state.questions.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"> No Questions Available.</td>
                            </tr> :

                            this.state.questions.map((questions) => (
                                <tr key={questions.qid}>
                                    <td>{questions.question}</td>
                                    <td>{questions.deadline}</td>
                                    <td>
                                        {/*{console.log("TUTAJ : ", this.state.answers)}*/}

                                        {/*{console.log()}*/}
                                        {/*{this.state.answers.find(item => {return item.answers === questions.qid})*/}


                                        {/*   // var data = [*/}
                                        {/*    //    { "restaurant": { "name": "McDonald's", "food": "burger" } },*/}
                                        {/*    //    { "restaurant": { "name": "KFC",        "food": "chicken" } },*/}
                                        {/*    //    { "restaurant": { "name": "Pizza Hut",  "food": "pizza" } }*/}
                                        {/*    // ].*/}
                                        {/*    // res = JSON.search( data, '//*[food="pizza"]' );*/}
                                        {/*    //*/}
                                        {/*    // console.log( res[0].name );*/}
                                        {/*    // Pizza Hut*/}

                                        {1===2
                                           ?
                                            <div>
                                                {/*jest*/}
                                                {/*{this.state.answers[0].userid.toString()}*/}
                                                {/*{this.state.answers[0].qid.toString()}*/}
                                            </div>
                                                :

                                            <Col sm={10}>
                                                <input
                                                    value="true" type="radio" name="answer"
                                                    id="formHorizontalRadios1"
                                                    checked={this.state.selectedOption === 'true'}
                                                    onChange={this.handleOptionChange}
                                                    className="form-check-input"
                                                />Yes
                                                <br/>
                                                <input
                                                    value="false" type="radio" name="answer"
                                                    id="formHorizontalRadios2"
                                                    checked={this.state.selectedOption === 'false'}
                                                    onChange={this.handleOptionChange}
                                                    className="form-check-input"
                                                />No
                                            </Col>

                                        }
                                    </td>
                                    <td>
                                        <Form onSubmit={this.submitAnswer} id="answerFormId">
                                            {/*<Button  size="sm" variant="success" type="submit" onClick={console.log( questions.qid, this.state.selectedOption)}>*/}
                                            <Button  size="sm" variant="success" type="submit" onClick={event => this.submitAnswer(event, questions.qid, this.state.selectedOption)}>
                                                <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                                            </Button>
                                        </Form>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    {/*{this.state.answers[0].qid.toString()}*/}


                </Card.Body>
                {/*</Form>*/}
            </Card>
        );
    };
}
