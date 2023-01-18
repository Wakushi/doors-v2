import React from "react"


export default function DoorsIntro(props){


    return(
        <>
            <div className="door-zone">

                <div className="door doorA">
                    <div className="door-front"></div>
                    <div className="door-knobA">
                        <div className="door-knob-handle"></div>
                    </div>
                    <div className="door-front"></div>
                </div>

                <div
                  className="enter enterA"
                  onClick={()=> props.handleDoor(props.doors.consequenceA, props.doors.balance)}
                >
                    <h3>{props.doors.choiceA}</h3></div>

                <div
                 className="enter enterB" 
                 onClick={()=> props.handleDoor(props.doors.consequenceB, props.doors.balance)}
                >
                    <h3>{props.doors.choiceB}</h3></div>

                <div className="door doorB">
                    <div className="door-front"></div>
                    <div className="door-knobB">
                        <div className="door-knob-handle"></div>
                    </div>
                    <div className="door-front"></div>
               </div>
              

            </div>

            
        </>
        
    )
}