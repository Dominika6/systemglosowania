import React, {Component} from "react";
import {Button, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class AdminGetAllUsers extends Component{

    constructor(props) {
        super(props);
        this.state = {
            users : []
        };
        this.nameChange = this.nameChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }


    deleteUser = (event, user) => {

        console.log(user.id);

        event.preventDefault()
        this.setState({
            [event.target.name]:event.target.value
        });

        if (!window.confirm("Jesteś pewny?")) {
            return;
        }

        axios.delete("http://localhost:8080/api/user/deleteUserById/" + user.id)
            .then(response => {
                console.log("w axiosie")
                if(response.data != null){
                    alert(response.data);
                    window.location.reload();
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
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
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
                                        <Button size="sm" variant="danger" type="submit" onClick={event => this.deleteUser(event, user)}>
                                                <FontAwesomeIcon icon={faTrash} />&nbsp; Delete
                                            </Button>
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

