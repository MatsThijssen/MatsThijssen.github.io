import { Box, Grid2, Typography } from "@mui/material";
import { Indexes } from "./game";
import EastIcon from "@mui/icons-material/East";

export interface Letter {
  value?: string;
  color?: string;
  arrowTo?: Indexes;
}

// Gets the rotation, in degrees, for an arrow going from one letter to another
function arrowRotation(x: number, y: number) {
  let rotation = y === 1 ? 180 : 0;
  rotation -= (Math.sign(-y || 1) * x * 90) / (Math.abs(x) + Math.abs(y));
  return rotation;
}
/**
 * Given a Letter object creates a letter-element. Consists of a box with the
 * letter inside and optionally an arrow to another letter
 */
export function createLetter(letter: Letter) {
  return (
    <Grid2 size={{ xs: 3 }}>
      <Box
        sx={{
          borderRadius: 5,
          borderColor: "white",
          backgroundColor: "burlywood",
          boxShadow: `0px 0px 7px 12px inset ${letter.color ?? "bisque"}`,
          height: "8rem",
          width: "8rem",
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "8rem",
          fontSize: "5rem",
          position: "relative",
        }}
      ><Typography color="transparent" fontSize={'5rem'} lineHeight={"8rem"}  sx={{ textShadow: '1px 1px 1px #000, 0 0 0 #ddd, 1px 1px 1px #000'}}>
        {(letter?.value === "QU" ? "Qu" : letter.value) ?? ""}
        </Typography>
        {letter.arrowTo && (
          <EastIcon
            fontSize="large"
            sx={{
              color: "primary.main",
              position: "absolute",
              minWidth: "5rem",
              minHeight: "5rem",
              top: `${1.5 - letter.arrowTo.x * 4.5}rem`,
              right: `${1.5 + letter.arrowTo.y * 4.5}rem`,
              zIndex: "999",
              rotate: `${arrowRotation(letter.arrowTo.x, letter.arrowTo.y)}deg`,
            }}
          />
        )}
      </Box>
    </Grid2>
  );
}

/**
 * Generates a random Letter-object, used when initially populating the board.
 * TODO: Pick without replacement and improve distributioj of letters
 */
export function generateRandomLetter(): Letter {
  const characters = "AAABCCCDEEEEFGHIIIJKKLLMNNNOOOOPQRSSSTTUUUVWXYZ";

  const randomIndex = Math.floor(Math.random() * characters.length);
  let char = characters.charAt(randomIndex);
  if (char === "Q") char += "U";

  return {
    value: char,
    color: "bisque",
  };
}

export function generate16LettersFromDice(): Letter[] {
  // The official game dice
  const dice = [
    ["A", "E", "A", "N", "E", "G"],
    ["A", "H", "S", "P", "C", "O"],
    ["A", "S", "P", "F", "F", "K"],
    ["O", "B", "J", "O", "A", "B"],
    ["I", "O", "T", "M", "U", "C"],
    ["R", "Y", "V", "D", "E", "L"],
    ["L", "R", "E", "I", "X", "D"],
    ["E", "I", "U", "N", "E", "S"],
    ["W", "N", "G", "E", "E", "H"],
    ["L", "N", "H", "N", "R", "Z"],
    ["T", "S", "T", "I", "Y", "D"],
    ["O", "W", "T", "O", "A", "T"],
    ["E", "R", "T", "T", "Y", "L"],
    ["T", "O", "E", "S", "S", "I"],
    ["T", "E", "R", "W", "H", "V"],
    ["N", "U", "I", "H", "M", "QU"],
  ];

  const letters = dice.map((die) => ({
    color: "bisque",
    value: die[Math.floor(Math.random() * die.length)],
  }));

  shuffleArray(letters);
  return letters;
}

function shuffleArray(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
