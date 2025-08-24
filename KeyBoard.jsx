import clsx from "clsx";
export default function KeyBoard(props) {
  function handleClick(event) {
    props.onClick(event.target.value);
  }
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const lettersElements = Array.from(alphabet).map((letter) => {
    const isGuessed = props.guessedLetters.includes(letter);
    const isCorrect = isGuessed && props.currentWord.includes(letter);
    const isWrong = isGuessed && !props.currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        disabled ={props.isDisabled}
        className={className}
        aria-disabled={props.guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        key={letter}
        value={letter}
        onClick={handleClick}
      >
        {letter.toUpperCase()}
      </button>
    );
  });
  return <>{lettersElements}</>;
}
