import { useMemo, useState } from 'react'
import './App.css'

const generateColor = () => {
  const hexChars = "0123456789ABCDEF";
  const getChar = () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))

  let generatedColor = "#"

  for (let i = 0; i < 6; i++) {
    generatedColor += getChar();
  }

  return generatedColor;
}

const makeColorsList = () => {
  let colors = []
  for (let i = 0; i < 3; i++) {
    colors.push(generateColor())
  }

  return colors;
}

function App() {
  const [colorsList, setColorsList] = useState(makeColorsList())
  const [isCorrect, setIsCorrect] = useState<undefined | boolean>()
  const correctGuess = useMemo(() => colorsList[Math.floor(Math.random() * 3)], [colorsList])

  const handleGuess = (guess: string) => {
    if (guess === correctGuess) {
      setIsCorrect(true)
      setColorsList(makeColorsList())
      return
    }

    setIsCorrect(false)
  }

  const message = () => {
    if (isCorrect === undefined) {
      return (
        <>
          <h3 style={{ color: "black" }}>Make a guess!</h3>
        </>
      )
    }

    return (
      <>
        {
          isCorrect
            ? <h3 style={{ color: "green" }}>Correct!</h3 >
            : <h3 style={{ color: "red" }}>Incorrect</h3>
        }
      </>
    )
  }

  return (
    <div className="App">
      <div className="displayColor" style={{ backgroundColor: correctGuess }} />
      <div className="guesses">
        {colorsList.map((color) => (
          <button key={color} onClick={() => handleGuess(color)} >{color}</button>
        ))}
      </div>
      {message()}
    </div>
  )
}

export default App
