import React from 'react';
import {htmlContent} from './htmlContent';
import './Parser.css';

var ticket, comment, PCS, multiPCS

// console.log("Ticket->>>", ticket)
// console.log("Comment->>>", comment)
// console.log("Comment having blocked->>>", comment.toString().includes("Blocked"))
// console.log("Length->>", PCS.length)

function Parser() {
    var counter = 0
    console.log("Re-rendering->>>>>>>>>>>")

    const parser = () => {
        const parser = new DOMParser()
        const parsedHtml = parser.parseFromString(htmlContent, 'text/html')
        const content = parsedHtml.getElementsByClassName('ghx-row')
        const data = [...content]
        
        return data.map((item, index) => {
            ticket = item.childNodes[4].children[0].childNodes[0].data
            comment = item.childNodes[6].children[0].childNodes[0].data
            
            if (comment.includes("Blocked") && comment.includes("PCS")) {
                PCS = (comment).substring((comment).indexOf("Blocked") + 11).trim()
                // console.log("Comment->>>>>", comment)
                // console.log(PCS.split(","))
                multiPCS = PCS.split(",")
                counter += 1
                console.log("Counter->>>", counter)
                return (
                    <tr>
                        <td>{ticket}</td>
                        <td>{comment}</td>
                        <td>{ multiPCS.map((pcs) => <a href={`https://dev.pulsesecure.net/jira/browse/${pcs}`}>{pcs}</a>) }</td>
                        {/* <td>NA</td> */}
                        {/* {<td>{getStatus()}</td>} */}
                        <td>{ multiPCS.map((pcs) => getStatus(`https://dev.pulsesecure.net/jira/browse/${pcs}`)) }</td>
                    </tr>
                )
            }
        })
    }
    
    const getStatus = (url) => {
        // const url = 'https://jsonplaceholder.typicode.com/users';
        console.log(url)
        var flag = 0;
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4){
                console.log(request.status);
                if (request.status === 200){
                    console.log("Successful!")
                    flag = 1;
                }
                else{
                    console.log("Error!")
                    flag = 0;
                }
            }
        };
        request.open("GET", url, true);
        request.send(); 
        return flag === 1 ? "Successful!" : "Error!"
    } 

    return (
        <div className="parser">
            <h1>Pulse Secure ScrumBoard</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Ticket</th>
                        <th>Comment</th>
                        <th>Blocker(s)</th>
                        <th>Status</th>
                    </tr>
                    { parser() }
                </tbody>
            </table>
            <h3>Total {counter} blocked tickets are detected!</h3>
        </div>
    )
}

export default Parser
