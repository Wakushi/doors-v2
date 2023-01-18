import React from "react"
import Doors from "./components/Doors"
import DoorsIntro from "./components/DoorsIntro"
import doorData from "./doorData"
import doorIntroData from "./doorIntroData"
import Narration from "./components/Narration"
import dialogs from "./dialogs"

export default function App() {

  
  const [gameStarted, setGameStarded] = React.useState(false)
  const [gameOver, setGameOver] = React.useState(false)
  const [introDone, setIntroDone] = React.useState(false)
  const [dialogLock, setDialogLock] = React.useState(false)

  
  // STATES DU SCRIPT DE L'INTRO //

 // dialog est un string tiré du tableau importé dialogs
 const [dialog, setDialog] = React.useState(dialogs[0])

 // currentDialogIndex permet de tracker quel dialogue est en cours
 const [currentDialogIndex, setCurrentDialogIndex] = React.useState(dialogs.indexOf(dialog))

  // GESTION DU STATE DES PORTES SCRIPTÉES DE L'INTRO //
 const [allDoorsIntro, setAllDoorsIntro] = React.useState(doorIntroData)
 const [doorsIntro, setDoorsIntro] = React.useState({})

  // --------------------------- //
 

  // STATES DU MAIN GAME //

  // allDoors est le tableau contenant toutes les portes 
  const [allDoors, setAllDoors] = React.useState(doorData) // allDoors = array that contains all the doors 

  // doors est une des portes du tableau de doorData (allDoors)
  const [doors, setDoors] = React.useState({})

  // moral est la jauge de moral du joueur > si =100% ou =0% c'est game over. 
  const [moral, setMoral] = React.useState(50)

  // --------------------------- //


  // setRandomDoor() : Set le state de door aléatoirement sur une des portes du tableau 
  function setRandomDoor() {
    let randomDoor = allDoors[Math.floor(Math.random() * allDoors.length)]
    setDoors(randomDoor)
  }

  let currentDoorIndex = allDoors.indexOf(doors)

  function setNextDoor() {
    setDoors(allDoors[currentDoorIndex + 1])
  }

  // Gestion du fondu en noir entre les portes

  const [opaque, setOpaque] = React.useState(0)

  const blackScreenStyles = {
    opacity : opaque
  }
  


  // handleDoor() : Vérifie si le choix était le "bon" et ajuste le compteur de 'moral' en fonction, puis appelle une 
  //                nouvelle porte avec setNextDoor()
  function handleDoor(consequence,balance) {

    switch (consequence) {
      case "good":
        setMoral(prevMoral => prevMoral += balance)
        setTimeout(()=>(
          setNextDoor()
        ),1100);   
      break;

      case "bad":
        setMoral(prevMoral => prevMoral -= balance);
        setTimeout(()=>(
          setNextDoor()
        ),1500);   
        break;
      
      case "boy1":
        // WORK ON THE BOY CHOICE
        break;

      case "scientist1":
      
        break;
    
      default:
        break;
    }
      setTimeout(()=>( 
        setOpaque(1) // Lance le fond noir
      ),700);
      
      setTimeout(()=>( 
        setOpaque(0)  // Supprime le fond noir au bout de 1200ms
      ),1200);

        
  }
 
  // Gère le visuel de la barre de moral selon le state de moral
  const moralStyle = {
    width: moral + '%'
  }

  // Condition de game over
  if(moral == 0){
    setMoral(50)
    setGameOver(true)
    setGameStarded(false)
  }

  // Redémarre une nouvelle partie
  function startGame(){
    setGameOver(false)
    setGameStarded(true)
    setAllDoors(doorData)  
  }



  // ---------- PARTIE NARRATION - INTRO  -------------- //


   // handleDoorIntro() : Permet de gérer le déroulé scripté de l'intro. Elle définie ce qu'il se passe
  //                      quand le joueur choisi une porte dans l'intro.
  function handleDoorIntro() {
    switch (currentDialogIndex) {
      case 12:
        setDoorsIntro({})
        setDialogLock(false)
        setDialog(dialogs[13]) 
        break;    
      default:
        break;
    }
  }
  
  // nextDialog permet d'afficher le dialogue suivant 
  function nextDialog(){
        if(!dialogLock) {
          setCurrentDialogIndex(currentDialogIndex + 1)
          setDialog(dialogs[currentDialogIndex])
        }
  }

  if(currentDialogIndex == 11){
    setCurrentDialogIndex(12) // Évite une boucle de rendu infini
    setDoorsIntro(allDoorsIntro[0])
    setDialogLock(true) // Désactive le bouton skip dialog
  }

  if(currentDialogIndex == 17){
    setCurrentDialogIndex(18)
    setMoral(90)
  }

  if(currentDialogIndex == 19){
    setCurrentDialogIndex(20)
    setMoral(10)
  }

  if(currentDialogIndex == 21){
    setCurrentDialogIndex(22)
    setMoral(50)
  }

  if(currentDialogIndex == 23){
    setCurrentDialogIndex(24)
    setDialogLock(true)
    setIntroDone(true)
    setDoors(allDoors[0]) // Le jeu démarre après l'intro et la première porte est affichée.
  }

  React.useEffect(()=> {
    setDialog(dialogs[currentDialogIndex])
  }, [currentDialogIndex])

  // ----------------------------------------- //
  






  // FONCTIONS UTILITAIRE / MAINTENANCE //

  function checkVar() {
    console.log("----------------------")
    console.log("Dilemme n° : " + currentDoorIndex)
    console.log("Moral : " + moral)
    console.log("Door event : " + doors.event)
    console.log("Consequence A : " + doors.consequenceA)
    console.log("Choice A : " + doors.choiceA)
    console.log("Consequence B : " + doors.consequenceB)
    console.log("Choice B : " + doors.choiceB)
  }




  return (
    <main>

      {/* Écran noir de transition */}
      {!gameOver && <div className="black-screen" style={blackScreenStyles}></div>}

      {/* Écran de Game Over */}
      {gameOver && <div className="game-over"><h1 onClick={startGame}>Game Over</h1></div>}

      {/* Bouton start */}
      {!gameStarted && <button className="start-button" onClick={startGame}>Start</button>}

      {/* Zone de jeu principale */}
      {gameStarted && <div className="main-game">

        {/* Zone des portes */}
        {introDone ?
         <Doors doors={doors} handleDoor={handleDoor}/>
         : <DoorsIntro doors={doorsIntro} handleDoor={handleDoorIntro}/>
        }

        {/* Bulle de dialogue / narration */}
        <Narration
          dialog={dialog}
          questions={doors}
          handleDialog={nextDialog}
          isDone={introDone}
        />

        {/* Barre de moral  */}
        <div className="moral">
            <div className="moral-jauge" style={moralStyle} onClick={checkVar}></div>
        </div>

      </div>}

    </main>
  )
}


