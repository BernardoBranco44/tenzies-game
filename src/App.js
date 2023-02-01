import './App.css';
import React, {useState, useEffect} from 'react';
import Die from "./Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dicesArray, setDicesArray] = useState(newDices())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)

const dices = dicesArray.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id )}/>)

  useEffect(() => {
    const allHeld = dicesArray.every(die => die.isHeld)
    const compareValue = dicesArray[0].value
    const sameValue = dicesArray.every(die => die.value === compareValue)
    if (allHeld && sameValue) {
      setTenzies(true)
    }
  },[dicesArray])

  function newDices() {
    let allDice = []
    for (let i = 0; i < 10; i++) {
      allDice.push({value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid()})
    }
    return allDice
  }

  function rollDice() {
    if (tenzies) {
      setDicesArray(newDices())
      setTenzies(false)
      setRolls(0)
    } else {
      setRolls(prevValue => prevValue + 1)
      setDicesArray(oldArray => oldArray.map(die =>{
        return die.isHeld ?
        die :
        {value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid()}
      }))
    }
  }

  function holdDice(id) {
    setDicesArray(oldArray => oldArray.map(die => die.id === id ? {...die, isHeld:!die.isHeld} : die))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='container'>
        {dices}
      </div>
      <button onClick={rollDice}>{tenzies ? "Reset Game" : "Roll"}</button>
      <p className='rolls'>Rolls: {rolls}</p>
    </main>
  );
}
export default App;
