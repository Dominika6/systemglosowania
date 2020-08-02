import React, {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";


export function getCurrentUser() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    const savedUser = JSON.parse(savedUserJson);
    console.log('get current user');

    if (!savedUser) {
        return null;
    }
    return savedUser;
    // return savedUser[0];
}

export function getCurrentUserId() {
    const user = getCurrentUser();
    if (!user) {
        return null;
    }
    console.log('get current user id');

    return user.id;
}

export function getCurrentUser1() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    const savedUser = JSON.parse(savedUserJson);

    console.log('getcurr...1',savedUser )
    return savedUser;
}

export function getIsLoggedIn() {
    console.log('get is logged in');

    return !!getCurrentUser();
}

export function getIsLoggedAsAdmin() {
    const user = getCurrentUser();
    console.log('checking if admin', user);
    return !!user && user.role === 'ADMIN';
}

export function getIsLoggedAsUser() {
    const user = getCurrentUser();
    console.log('checking if user', user);
    return !!user && user.role === 'USER';
}

// export function getUserId(userid) {
//         axios.get("http://localhost:8080/api/user/getUserById/" + userid)
//             .then(response => {
//                 if (response.data != null){
//                     alert(response.data);
//                 }
//             });
// }
// export async function getUserId(userid) {
//         const response = await axios.get("http://localhost:8080/api/user/getUserById/" + userid);
//         return response.data;
//
// }



export function logout() {
    window.localStorage.removeItem('currentUser');
    window.location.href = '/';
    console.log('logout')
    // window.location.reload();
}

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = { email:'', password:'', userid:'', changeEmail:[]};
        this.changeId = this.changeId.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.login = this.login.bind(this);
    }

    changeId = userid => {
        this.setState({userid: userid})
    }

    changeEmail = email => {
        this.setState({email: email})
    }

    changePassword = password => {
        this.setState({password: password})
    }


    // handleSubmit = async (event) => {
    //     if (!this.state.userid) {
    //         alert('Podaj id');
    //         return;
    //     }
    //     const userInfo = await getCurrentUserId();
    //     if (!userInfo) {
    //         alert('zle id');
    //         return;
    //     }
    //     window.localStorage.setItem('currentUser', JSON.stringify(userInfo));
    //     window.location.reload();
    // }
    // handleSubmit = async (event) => {
    //     // if (!this.state.userid) {
    //     //     alert('Podaj id');
    //     //     return;
    //     // }
    //     const userInfo = await getUserId(this.state.userid);
    //     // if (!userInfo) {
    //     //     alert('zle id');
    //     //     return;
    //     // }
    //     window.localStorage.setItem('currentUser', JSON.stringify(userInfo));
    //     window.location.reload();
    // }

    handleLogoout = event => {
        window.localStorage.removeItem('currentUserId');
        window.location.reload();
    }

    initialState = {
        email:'', password:''
    }

    login = event => {
        // const userid = getCurrentUserId();
        const encodedEmail = encodeURIComponent(this.state.email);
        event.preventDefault()
        axios.get("http://localhost:8080/api/user/login/" + encodedEmail + "/" + this.state.password)
            .then(response => {
                if(response.data === null){
                    alert("Nieprawidłowe dane")
                }
                if(response.data !== null) {
                    // const userInfo = this.changeId(response.data.id);
                    console.log(JSON.stringify(response.data))
                    window.localStorage.setItem('currentUser', JSON.stringify(response.data));
                    console.log('current user: ',response.data)
                    window.location.reload()

                }
            });
    }
    //
    // login = event => {
    //     // const userid = getCurrentUserId();
    //     const encodedEmail = encodeURIComponent(this.state.email);
    //     event.preventDefault()
    //     axios.get("http://localhost:8080/api/user/login/" + encodedEmail + "/" + this.state.password)
    //         .then(response => {
    //             response.data.toString().replace("[", "").replace("]", "");
    //             if(response.data.toString() !== ""){
    //                 this.setState({userid: response.data.toString()})
    //                 alert("The details are correct, you can go to your account.")
    //             }
    //             if(response.data.toString() === "") {
    //                 alert("nieprawidłowe dane")
    //             }
    //         });
    // }

    emailChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }


    render() {

        return(

            <Card className={"border border-dark bg-dark text-white"}>
                <Form onReset={this.resetAnswer} onSubmit={this.login} id="loginFormId">
                    <Card.Header>
                        <Form.Label> <FontAwesomeIcon icon={faLock} /> &nbsp; Sign in </Form.Label></Card.Header>
                    <div>
                        {/*<br/>*/}
                        {/*marta1@student.uj.edu.pl<br/>Martamarta1<br/>*/}
                        {/*<input required placeholder="Enter Your Email" value={this.state.email} onChange={this.emailChange} />*/}
                        {/*&nbsp; &nbsp;*/}
                        {/*<input required type={"password"} placeholder="Enter Your Password" value={this.state.password} onChange={this.emailChange} />*/}
{/*                        <br/>*/}
{/*                        marta@student.uj.edu.pl<br/>Martamarta1<br/>*/}
{/*                        <input placeholder="Enter Your Email" value={this.state.email} onChange={event => this.changeEmail(event.target.value)} />*/}
{/*                        &nbsp; &nbsp;*/}
{/*                        <input type={"password"} placeholder="Enter Your Password" value={this.state.password} onChange={event => this.changePassword(event.target.value)} />*/}

                        <Form.Group as={Col} controlId="formGridNewEmail">
                            <Form.Control required autoComplete="off" type="email"
                                          name="email" onChange={this.emailChange}
                                          value={this.state.email}
                                          className="bg-dark text-white"
                                          placeholder="Email" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNewPassword">
                            <Form.Control required autoComplete="off" type="password"
                                          name="password" onChange={this.emailChange}
                                          value={this.state.password}
                                          className="bg-dark text-white"
                                          placeholder="Password" />
                        </Form.Group>
                    </div>
                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        Press after entering the data: &nbsp;
                        <Button size="sm" variant="success" type="submit">
                            &nbsp;Login
                        </Button> {' '}
                        {/*<Button  size="sm" variant="info" type="reset">*/}
                        {/*    <FontAwesomeIcon icon={faUndo} />&nbsp; Reset*/}
                        {/*</Button>*/}

                        {/*&nbsp; &nbsp; Press after the data confirmation message: &nbsp;*/}
                        {/*<Button size={"sm"} variant="success" onClick={this.handleSubmit}>*/}
                        {/*    Go to my account*/}
                        {/*</Button>*/}
                    </Card.Footer>

                </Form>
            </Card>

            // <>
            //  {/*<Card className={"border border-dark bg-dark text-white"}>*/}
            //  {/*   <Form onReset={this.resetAnswer} onSubmit={this.submitName} id="nameFormId">*/}
            //  {/*       <Card.Header><FontAwesomeIcon icon={faLock}/> &nbsp; Sign In </Card.Header>*/}
            //  {/*       <Card.Body>*/}
            //
            //             {getIsLoggedIn() && <>
            //                 <Button href="/" onClick={this.handleLogoout}>Wyloguj sie</Button>
            //             </>}
            //
            //             {!getIsLoggedIn() && <>
            //                 user: <br/> ef691692-805e-4d44-89f4-3bc0c38bcc00 <br/> <br/>
            //                 admin: <br/> 7f5caae4-2977-4638-badb-ff190bf44d17 <br/>
            //
            //
            //         {/*<Card.Footer style={{"textAlign":"right"}}>*/}
            //         {/*    <input style={faAlignLeft} placeholder="Enter Your ID" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />*/}
            //
            //         {/*    <Button size="sm" variant="success" type="submit" onClick={this.handleSubmit} onChange={event => this.changeId(event.target.value)}>*/}
            //         {/*        <FontAwesomeIcon icon={"fort-awesome"} />&nbsp; Login*/}
            //         {/*    </Button>*/}
            //         {/*</Card.Footer>*/}
            //
            //
            //         <input placeholder="Enter Your ID" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />
            //         <button  variant="success" onClick={this.handleSubmit}>Login</button>
            //         </>}
            //
            //  {/*       </Card.Body>*/}
            //  {/*   </Form>*/}
            //  {/*</Card>*/}
            // </>
        );
    };
}
