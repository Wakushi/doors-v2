import React from "react"
import scientist from "../assets/scientist.png"
import child from "../assets/child.png"



export default function Doors(props){

    // Ces tableaux contiennent les données de chaque sprite
    const boy = [child, "60px"];
    const theScientist = [scientist, "160px"];

    // Initialisation des variables d'image 
    let currentImageA;
    let imageASize;
    let currentImageB;
    let imageBSize;

    // Switch permettant d'assigner les bons sprites aux bonnes variables d'image selon le doors.asset
    switch (props.doors.asset) { // Lis la propriété 'asset' de l'objet 'door' en cours de doorData.js
        case "scientist and child": 
             currentImageA = boy[0] 
             imageASize = boy[1] 
             currentImageB = theScientist[0] 
             imageBSize = theScientist[1] 
            break;
        case "child":
            currentImageA = boy[1];
            imageASize = boy[2] 
             currentImageB = theScientist[1] 
             imageBSize = theScientist[3] 
        default:
            break;
    }
    


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
                    {props.doors.displaying ? <img className="entrance-asset assetA" src={currentImageA} width={imageASize}></img> : <h3>{props.doors.choiceA}</h3>}
                
                </div>

                <div
                 className="enter enterB" 
                 onClick={()=> props.handleDoor(props.doors.consequenceB, props.doors.balance)}
                >

                    {props.doors.displaying ? <img className="entrance-asset assetB" src={currentImageB} width={imageBSize}></img> : <h3>{props.doors.choiceB}</h3>}
                
                </div>

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