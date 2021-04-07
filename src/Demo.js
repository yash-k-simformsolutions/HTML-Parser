import React from 'react';
import HtmlContent from './Demo.html';

function Demo() {

    const demoD = () => {
        <HtmlContent />
        var i = document.getElementsByTagName('body')[0].innerHTML
        console.log("Data->>>>>>>>>>")
        console.log(i)
        var newString = [...i]
        return newString.map((item) => <p>{item}</p>)
        // return <p>{i}</p>
        // return i.map((item) => <p>{item}</p>)
    }
    return (
        <div className="demo">
            {
                demoD()
            }
        </div>
    )
}

export default Demo
