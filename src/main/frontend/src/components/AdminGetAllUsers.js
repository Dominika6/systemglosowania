import React, {Component} from "react";
import {Button, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
// import Form from "react-bootstrap/Form";

export default class AdminGetAllUsers extends Component{

    constructor(props) {
        super(props);
        this.state = {
            users : []
        };
        this.nameChange = this.nameChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    // initialState = {
    //     userid:''
    // }

    deleteUser = event => {
        console.log(this.id);

        event.preventDefault()
        // {this.setState({userid : this.users.id})}
        this.setState({
            [event.target.name]:event.target.value
        });

        axios.delete("http://localhost:8080/api/user/deleteUserById/" + this.state.id)
            .then(response => {
                console.log("w axiosie")
                if(response.data != null){
                    // this.setState(this.initialState);
                    alert(response.data);
                    // window.location.reload();
                }
                console.log("tu")
            });
    }

    nameChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    componentDidMount() {
        this.findAllUsers();

    }

    findAllUsers(){
        axios.get("http://localhost:8080/api/user/getAllUsers")
            .then(response => response.data)
            .then((data) => {
                this.setState({users : data});
            });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp; Users</Card.Header>
                <Card.Body>
                    <Table bordered hover variant="dark">
                        {/*powyżej było dodane stripped ale generowało błędy*/}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.users.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"> No Users Available.</td>
                            </tr> :
                            this.state.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {/*<Form onSubmit={user.deleteUser} id="nameFormId">*/}
                                            {/*<Form.Group as={Col} controlId="formGridId">*/}
                                                {/*<Form.Control required name="userid" value={this.state.userid}*/}
                                                {/*              onChange={this.nameChange} autoComplete="off"*/}
                                                {/*              className="bg-dark text-white"*/}
                                                {/*              placeholder="Enter the user ID you want to delete. "/>*/}

                                            {/*</Form.Group>*/}
                                        {/*{console.log(user.id)}*/}
                                        <form action={user.deleteUser} id="nameFormId">
                                        <Button size="sm" variant="danger" type="submit">
                                                <FontAwesomeIcon icon={faTrash} />&nbsp; Delete
                                            </Button></form>
                                        {/*</Form>*/}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    };
}

