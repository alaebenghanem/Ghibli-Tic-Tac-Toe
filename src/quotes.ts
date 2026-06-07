// Ghibli character quotes organized by character and game phase
// Calcifer = fire demon (first player), Jiji = black cat (second player)

type GamePhase = "early" | "mid" | "late" | "won" | "lost" | "draw";
type Character = "calcifer" | "jiji";

const calciferQuotes: Record<GamePhase, string[]> = {
  early: [
    "I'm a scary and powerful fire demon!",
    "May all your bacon burn!",
    "Let me show you real firepower!",
    "You'd better not underestimate me!",
    "I didn't agree to this... but fine!",
  ],
  mid: [
    "This is getting interesting... for a demon like me.",
    "I'm literally on fire right now!",
    "Hmph, not bad for a cat...",
    "Don't make me burn this whole board down!",
    "I've moved castles, I can move game pieces!",
  ],
  late: [
    "The flames of victory are near!",
    "Almost there... I can feel the heat!",
    "One more move and I'll be free!",
    "This board can't contain my power!",
  ],
  won: [
    "I knew I was the superior element!",
    "Fire always wins! ALWAYS!",
    "That's the power of a fire demon, baby!",
    "Howl would be proud... not that I care!",
  ],
  lost: [
    "You can't treat a fire demon like this!",
    "I'll remember this... *flickers angrily*",
    "This doesn't count! I was barely trying!",
    "I need more logs... I mean, rematch!",
  ],
  draw: [
    "A tie?! How boring! Feed me eggshells!",
    "Neither of us wins? What a waste of my flames!",
    "I demand a rematch! This is unacceptable!",
  ],
};

const jijiQuotes: Record<GamePhase, string[]> = {
  early: [
    "I have a bad feeling about this...",
    "Do I really have to play?",
    "Fine, but I'm only doing this once.",
    "*yawns* ...Oh, it's my turn?",
    "A cat's intuition is never wrong!",
  ],
  mid: [
    "Not bad for a cat, huh?",
    "I've seen scarier things than a fire.",
    "Kiki would be cheering me on right now!",
    "My whiskers are tingling... good sign!",
    "That flame talks too much...",
  ],
  late: [
    "Even a black cat brings good luck sometimes!",
    "Almost there... *tail swishes*",
    "Don't count this cat out just yet!",
    "Nine lives means nine chances to win!",
  ],
  won: [
    "Cats always land on their feet... and WIN!",
    "That's what happens when you mess with Jiji!",
    "I'll be napping on the victory podium!",
    "*purrs triumphantly*",
  ],
  lost: [
    "I'm going back to sleep...",
    "*hisses* This game is rigged!",
    "Whatever... I let you win. Obviously.",
    "I need Kiki... this is too stressful!",
  ],
  draw: [
    "A tie? I'll take it. Nap time!",
    "At least I didn't lose to a flame...",
    "How anticlimactic... *licks paw*",
  ],
};

const allQuotes: Record<Character, Record<GamePhase, string[]>> = {
  calcifer: calciferQuotes,
  jiji: jijiQuotes,
};

/**
 * Get a random quote for a character based on the game phase.
 * @param character - "calcifer" or "jiji"
 * @param moveCount - number of moves made so far (0-9)
 * @param gameResult - "won", "lost", "draw", or null if game is ongoing
 * @param isThisCharactersTurn - whether it's currently this character's turn
 */
export function getQuote(
  character: Character,
  moveCount: number,
  gameResult: "won" | "lost" | "draw" | null
): string {
  let phase: GamePhase;

  if (gameResult) {
    phase = gameResult;
  } else if (moveCount <= 2) {
    phase = "early";
  } else if (moveCount <= 5) {
    phase = "mid";
  } else {
    phase = "late";
  }

  const pool = allQuotes[character][phase];
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Determine which game phase we're in based on move count.
 */
export function getGamePhase(moveCount: number): GamePhase {
  if (moveCount <= 2) return "early";
  if (moveCount <= 5) return "mid";
  return "late";
}

export type { Character, GamePhase };
