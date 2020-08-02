// import React, {Component} from "react";
// import {Button, Card, Col, Form} from "react-bootstrap";
// import axios from 'axios';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faEdit, faLock, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
//
//
// export function getCurrentUser() {
//     const savedUserJson = window.localStorage.getItem('currentUser');
//     const savedUser = JSON.parse(savedUserJson);
//     if (!savedUser) {
//         return null;
//     }
//     return savedUser[0];
// }
//
// export function getCurrentUserId() {
//     const user = getCurrentUser();
//
//     if (!user) {
//         return null;
//     }
//
//     return user.id;
// }
//
// export function getIsLoggedIn() {
//     return !!getCurrentUser();
// }
//
// export function getIsLoggedAsAdmin() {
//     const user = getCurrentUser();
//     console.log('checking if admin', user);
//     return !!user && user.role === 'ADMIN';
// }
//
// export function getIsLoggedAsUser() {
//     const user = getCurrentUser();
//     console.log('checking if user', user);
//     return !!user && user.role === 'USER';
// }
//
// export async function getUserId(userId) {
//     const response = await axios.get("http://localhost:8080/api/user/getUserById/" + userId);
//     return response.data;
//
// }
//
// function validateDatas() {
//
//
// }
//
// export function logout() {
//     window.localStorage.removeItem('currentUser');
//     window.location.href = '/';
//     // window.location.reload();
// }
//
// export default class Login extends Component{
//
//     constructor(props) {
//         super(props);
//         this.state = { userId:'', changeEmail:[]};
//         this.changeId = this.changeId.bind(this);
//         this.emailChange = this.emailChange.bind(this);
//         this.submitEmail = this.submitEmail.bind(this);
//     }
//
//     changeId = userId => {
//         this.setState({userId: userId})
//     }
//
//     handleSubmit = async (event) => {
//         if (!this.state.userId) {
//             alert('Podaj id');
//             return;
//         }
//
//         const userInfo = await getUserId(this.state.userId);
//
//         if (!userInfo) {
//             alert('zle id');
//             return;
//         }
//
//         window.localStorage.setItem('currentUser', JSON.stringify(userInfo));
//         window.location.reload();
//     }
//
//     handleLogoout = event => {
//         window.localStorage.removeItem('currentUserId');
//         window.location.reload();
//     }
//
//
//
//     initialState = {
//         userid:'', email:''
//     }
//
//     submitEmail = event => {
//         const userid = getCurrentUserId();
//
//
//
//         const encodedEmail = encodeURIComponent(this.state.email);
//         event.preventDefault()
//         axios.put("http://localhost:8080/api/user/updateUserEmail/" + userid + "/" + encodedEmail)
//             .then(response => {
//                 if(response.data != null){
//                     this.setState(this.initialState);
//                     alert(response.data);
//                     window.location.reload();
//                 }
//             });
//     }
//
//     emailChange = event => {
//         this.setState({
//             [event.target.name]:event.target.value
//         });
//     }
//
//
//
//     render() {
//         return(
//
//             <Card className={"border border-dark bg-dark text-white"}>
//                 <Form onReset={this.resetAnswer} onSubmit={this.submitEmail} id="emailFormId">
//                     <Card.Header>
//                         <Form.Label> <FontAwesomeIcon icon={faLock} /> &nbsp; Sign in </Form.Label></Card.Header>
//                     <div>
//                         <br/>
//                         <Form.Group as={Col} controlId="formGridNewEmail">
//                             <Form.Control required autoComplete="off"
//                                           name="email" onChange={this.emailChange}
//                                 // value={email}
//                                           className="bg-dark text-white"
//                                           placeholder="Email" />
//                         </Form.Group>
//                         <Form.Group as={Col} controlId="formGridNewEmail">
//                             <Form.Control required autoComplete="off" type="password"
//                                           name="email" onChange={this.emailChange}
//                                 // value={email}
//                                           className="bg-dark text-white"
//                                           placeholder="Password" />
//                         </Form.Group>
//                     </div>
//                     <br/>
//                     <Card.Footer style={{"textAlign":"right"}}>
//                         <Button size="sm" variant="success" type="submit">
//                             <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
//                         </Button> {' '}
//                         <Button  size="sm" variant="info" type="reset">
//                             <FontAwesomeIcon icon={faUndo} />&nbsp; Reset
//                         </Button>
//                     </Card.Footer>
//                 </Form>
//             </Card>
//
//             // <>
//             //  {/*<Card className={"border border-dark bg-dark text-white"}>*/}
//             //  {/*   <Form onReset={this.resetAnswer} onSubmit={this.submitName} id="nameFormId">*/}
//             //  {/*       <Card.Header><FontAwesomeIcon icon={faLock}/> &nbsp; Sign In </Card.Header>*/}
//             //  {/*       <Card.Body>*/}
//             //
//             //             {getIsLoggedIn() && <>
//             //                 <Button href="/" onClick={this.handleLogoout}>Wyloguj sie</Button>
//             //             </>}
//             //
//             //             {!getIsLoggedIn() && <>
//             //                 user: <br/> ef691692-805e-4d44-89f4-3bc0c38bcc00 <br/> <br/>
//             //                 admin: <br/> 7f5caae4-2977-4638-badb-ff190bf44d17 <br/>
//             //
//             //
//             //         {/*<Card.Footer style={{"textAlign":"right"}}>*/}
//             //         {/*    <input style={faAlignLeft} placeholder="Enter Your ID" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />*/}
//             //
//             //         {/*    <Button size="sm" variant="success" type="submit" onClick={this.handleSubmit} onChange={event => this.changeId(event.target.value)}>*/}
//             //         {/*        <FontAwesomeIcon icon={"fort-awesome"} />&nbsp; Login*/}
//             //         {/*    </Button>*/}
//             //         {/*</Card.Footer>*/}
//             //
//             //
//             //         <input placeholder="Enter Your ID" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />
//             //         <button  variant="success" onClick={this.handleSubmit}>Login</button>
//             //         </>}
//             //
//             //  {/*       </Card.Body>*/}
//             //  {/*   </Form>*/}
//             //  {/*</Card>*/}
//             // </>
//         );
//     };
// }