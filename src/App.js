import './App.css';
import {htmlContent} from './htmlContent';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ShowTicket from './ShowTicket';
import { useState } from 'react';

function App() {
  const [blockerTicket, setBlockerTicket] = useState();

  const htmlParser = () => {
    let parser = new DOMParser()
    let parsedHtml = parser.parseFromString(htmlContent, 'text/html')
    let content = parsedHtml.getElementsByClassName('ghx-row')
    // console.log(content)

    let data = [...content]
    return data.map((item) => {
      console.log(item?.childNodes[4]?.children[0]?.childNodes[0]?.data)
      console.log((item?.childNodes[6]?.children[0]?.childNodes[0]?.data).toString().includes("Blocked"))
      console.log(item?.childNodes[6]?.children[0]?.childNodes[0])
      
      return(
        (item?.childNodes[6]?.children[0]?.childNodes[0]?.data).includes(" | Blocked") ? (
          <>
            { blockedPCS(item?.childNodes[4]?.children[0]?.childNodes[0]?.data, item?.childNodes[6]?.children[0]?.childNodes[0]?.data) }
          </>
        ) : console.log("--------NOT FOUND------------------------")
      )
    })
  }

  const blockedPCS = (ticket, comment) => {
    var PCS = (comment).substring((comment).indexOf("Blocked") + 11)
    setBlockerTicket(PCS)
    return (
        <tr>
        <Link to={`https://dev.pulsesecure.net/jira/browse/${blockerTicket}`}> <td>{ticket}</td> </Link>
        <Link to={`https://dev.pulsesecure.net/jira/browse/${blockerTicket}`}> <td>{comment}</td> </Link>
        <Link to={`https://dev.pulsesecure.net/jira/browse/${blockerTicket}`}> <td>{PCS}</td> </Link>  
        </tr>
    )
  }

  return (
    <Router>
      <div className="app">
        <h1>Pulse Secure ScrumBoard</h1>
        <table>
          <tr>
            <th>Ticket</th>
            <th>Comment</th>
            <th>Blocker(s)</th>
          </tr>
          { htmlParser() }
        </table>
      </div>
      <Switch>
        <Route exact path={`https://dev.pulsesecure.net/jira/browse/${blockerTicket}`} component={<ShowTicket />} />
      </Switch>
    </Router>
  );
}

export default App;
