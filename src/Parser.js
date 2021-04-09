import React from 'react';
import {htmlContent} from './htmlContent';
import './Parser.css';
import axios from 'axios';

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
        
        return data.map((item) => {
            ticket = item.childNodes[4].children[0].childNodes[0].data
            comment = item.childNodes[6].children[0].childNodes[0].data
            
            if (comment.includes("Blocked")) {
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
                        <td>NA</td>
                        {/* <td>{ multiPCS.map((pcs) => getStatus(`https://dev.pulsesecure.net/jira/browse/${pcs}`)) }</td> */}
                    </tr>
                )
            }
        })
    }
    // const getStatus = (url) => {
    //     console.log(url)
    //     const response = axios.get(url).then((res) => console.log(res.status))
    //     console.log(response)
        
        // var status
        // // console.log("Inside getStatus->>>>>>>")
        // // console.log(url)
        // // const url=`https://jsonplaceholder.typicode.com/todos/1`
        // const HTTP = new XMLHttpRequest()
        // HTTP.open("GET",url)
        // HTTP.send(null)
        // HTTP.onreadystatechange = () => {
        //     if(HTTP.readyState===4){
        //         if(HTTP.status===200){
        //             status = "Available"
        //             console.log(status)
        //         }
        //         else{
        //             status = "404"
        //             console.log(status)
        //         }
        //     }
        //     console.log(url)
        //     return {status}
        // }
    // }
    
    // function getStatus(url) {
    //     var request = new XMLHttpRequest();
    //     request.onreadystatechange = function() {
    //         if (request.readyState === 4){
    //             // request.status;//this contains the status code
    //             setHtml(request.status);
    //         }
    //     };
    //         request.open("GET", url, true);
    //         request.send(); 
    // } 

    // function setHtml(htmldata) {
    //     console.log(htmldata);
    //     return htmldata
    //     // var theDiv = document.getElementById(targetC);
    //     // theDiv.innerHTML = htmldata;
    // }

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
            {counter}
        </div>
    )
}

export default Parser
