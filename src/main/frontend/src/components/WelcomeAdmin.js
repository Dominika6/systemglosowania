import React, {Component} from "react";
import Card from "react-bootstrap/Card";


export default class Welcome extends Component{

    render() {
        return(
            <Card className={"bg-dark text-white p-5"}>
                <Card.Header>
                    <h1>Hello Admin!</h1><small>Welcome to the Voting Application. If this is your first time here, read the following instructions.</small>
                </Card.Header>
                <Card.Body><br/>
                    W zakładce "Your Account" znajdują się informacje o koncie administratora wraz z możliwością ich edycji.<br/><br/>
                    W zakładce "Manage User Accounts" administrator zarządza kontami użytkowników. Jest tu możliwość dodania bądź usunięcia, a także podglądu wszystkich zarejestrowanych użytkowników.<br/><br/>
                    W zakładce "Manage Surveys" administrator zarządza ankietami. Istnieje możliwość dodania, usunięcia z także podglądu pytań znajdujących się w bazie.<br/><br/>
                    W zakładce "Survey Results" wyświetlone są wyniki ankiet. (Treść pytania, termin zakończenia, procentowa ilość głosów za i przeciw oraz suma udzielonych na dane pytanie odpowiedzi.)
                </Card.Body>
            </Card>
        );
    }
}
