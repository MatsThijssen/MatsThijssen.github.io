import { Box, Grid2 } from "@mui/material";
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
          boxShadow: `0px 0px 7px 12px inset ${letter.color ?? "black"}`,
          height: "8rem",
          width: "8rem",
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "8rem",
          fontSize: "5rem",
          position: "relative",
        }}
      >
        {(letter?.value === "QU" ? "Qu" : letter.value) ?? ""}
        {letter.arrowTo && (
          <EastIcon
            fontSize="large"
            sx={{
              color: "navy",
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
