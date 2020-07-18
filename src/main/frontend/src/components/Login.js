import React, {Component} from "react";
import {Button} from "react-bootstrap";
import axios from 'axios';
// import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAlignLeft, faLock} from "@fortawesome/free-solid-svg-icons";


export function getCurrentUser() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    const savedUser = JSON.parse(savedUserJson);
    if (!savedUser) {
        return null;
    }
    return savedUser[0];
}

export function getCurrentUserId() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    return user.id;
}

export function getIsLoggedIn() {
    return !!getCurrentUser();
}

export function getIsLoggedAsAdmin() {
    const user = getCurrentUser();
    console.log('checking if admin', user);
    return !!user && user.role === 'ADMIN';
}

export async function getUserInfo(userId) {
        const response = await axios.get("http://localhost:8080/api/user/getUserById/" + userId);
        return response.data;

}

export function logout() {
    window.localStorage.removeItem('currentUser');
    window.location.href = '/';
    // window.location.reload();
}

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = { userId:''};
        this.changeId = this.changeId.bind(this);
    }

    changeId = userId => {
        this.setState({userId: userId})
    }

    handleSubmit = async (event) => {
        if (!this.state.userId) {
            alert('Podaj id');
            return;
        }

        const userInfo = await getUserInfo(this.state.userId);

        if (!userInfo) {
            alert('zle id');
            return;
        }

        window.localStorage.setItem('currentUser', JSON.stringify(userInfo));
        window.location.reload();
    }

    handleLogoout = event => {
        window.localStorage.removeItem('currentUserId');
        window.location.reload();
    }

    render() {
        return(
            <>
             {/*<Card className={"border border-dark bg-dark text-white"}>*/}
             {/*   <Form onReset={this.resetAnswer} onSubmit={this.submitName} id="nameFormId">*/}
             {/*       <Card.Header><FontAwesomeIcon icon={faLock}/> &nbsp; Sign In </Card.Header>*/}
             {/*       <Card.Body>*/}

                        {getIsLoggedIn() && <>
                            <Button onClick={this.handleLogoout}>Wyloguj sie</Button>
                        </>}

                        {!getIsLoggedIn() && <>
                            user: <br/> ef691692-805e-4d44-89f4-3bc0c38bcc00 <br/> <br/>
                            admin: <br/> 7f5caae4-2977-4638-badb-ff190bf44d17 <br/>


                    {/*<Card.Footer style={{"textAlign":"right"}}>*/}
                    {/*    <input style={faAlignLeft} placeholder="Enter Your ID" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />*/}

                    {/*    <Button size="sm" variant="success" type="submit" onClick={this.handleSubmit} onChange={event => this.changeId(event.target.value)}>*/}
                    {/*        <FontAwesomeIcon icon={"fort-awesome"} />&nbsp; Login*/}
                    {/*    </Button>*/}
                    {/*</Card.Footer>*/}


                    <input placeholder="Enter Your ID" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />
                    <button  variant="success" onClick={this.handleSubmit}>Login</button>
                    </>}

             {/*       </Card.Body>*/}
             {/*   </Form>*/}
             {/*</Card>*/}
            </>
        );
    };
}
