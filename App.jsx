import { useState } from "react";
import Chip from "./Chip";
import { languages } from "./language";
import CurrentWord from "./CurrentWord";
import KeyBoard from "./KeyBoard";
import clsx from "clsx";
import { getFarewellText, getWord } from "./utils";
import Confetti from "react-confetti";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const maxGuesses = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const numGuessesLeft = maxGuesses - wrongGuessCount;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessedLetterIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const languageChips = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;

    return (
      <Chip
        className={`chip ${isLanguageLost ? "lost" : ""}`}
        key={language.name}
        name={language.name}
        backgroundColor={language.backgroundColor}
        color={language.color}
      />
    );
  });

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessedLetterIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessedLetterIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  function newGame() {
    setCurrentWord(getWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass} aria-live="polite" role="status">
        {renderGameStatus()}
      </section>
      <section className="language-chips">{languageChips}</section>
      <section className="current-word">
        <CurrentWord
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          isGameLost={isGameLost}
        />
      </section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">
        <KeyBoard
          isDisabled={isGameOver}
          onClick={addGuessedLetter}
          currentWord={currentWord}
          guessedLetters={guessedLetters}
        />
      </section>
      {isGameOver && (
        <button className="new-game" onClick={newGame}>
          New Game
        </button>
      )}
    </main>
  );
}
