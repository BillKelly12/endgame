# Assembly: Endgame (React + Vite)

A small **hangman-style** game: guess the word within **8 attempts**. Each wrong guess “loses” a language chip; win triggers confetti 🎉 and a **New Game** button.

## How it works
- Picks a random word on start (`getWord()`), stores **guessed letters** in state.
- **Win** when every letter is revealed; **lose** after 8 wrong guesses  
  *(attempts are derived from `languages.length - 1`)*.
- On-screen keyboard adds letters; button disables when game is over.
- Accessibility: status updates via `aria-live`; celebratory confetti on win.

## Tech
- React + Vite
- `clsx` for conditional classes
- `react-confetti` for the win effect
- Components: `Chip`, `CurrentWord`, `KeyBoard`
- Utilities: `languages` (chips), `getFarewellText`, `getWord`

## Scripts
```bash
npm install
npm run dev
npm run build
```

## Deploy
Static hosting (e.g. Netlify).  
Build: `npm run build` → publish `dist/`.

## Notes
- New game resets the word and guessed letters.
- Chips visually track remaining attempts (based on `languages` order).
