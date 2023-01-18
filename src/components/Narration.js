import React from "react"

export default function Narration(props){


    return(
        <div className="narrator">

            {props.isDone ? <p className="dialog">{props.questions.dilemma}</p> :
            <p className="dialog">{props.dialog}</p>}

            {!props.isDone && <ion-icon
             name="caret-down-outline"
             onClick={props.handleDialog}
            >
            </ion-icon>}
        </div>
    )
}