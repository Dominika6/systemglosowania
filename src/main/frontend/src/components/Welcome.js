import React, {Component} from "react";
import Card from "react-bootstrap/Card";


export default class Welcome extends Component{

    render() {
        return(
            <Card className={"bg-dark text-white p-5"}>
                <Card.Header>
                    <h1>Hello User!</h1><br/>Welcome to the Voting Application. If this is your first time here, read the following instructions.
                </Card.Header>
                <Card.Body><br/>
                    W zakładce "Edit Account" znajdują się informacje o zalogowanym użytkowniku wraz z możliwością ich edycji.
                    <br/><br/>
                    W zakładce "Cast Your Vote" znajduje się lista pytań wraz z terminami ich zakończenia oraz odpowiedziami użytkownika. Gdy na dane pytanie nie została jeszcze udzielona odpowiedź, istnieje możliwość jej udzielenia.
                </Card.Body>
            </Card>
        );
    }
}
