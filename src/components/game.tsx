import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  createLetter,
  generate16LettersFromDice,
  generateRandomLetter,
  Letter,
} from "./letter";

export interface Indexes {
  x: number;
  y: number;
}

function indexDifference(a: Indexes, b: Indexes): Indexes {
  return {
    x: b.x - a.x,
    y: b.y - a.y,
  };
}

const MW_API_KEY = "cdac013a-753e-4801-81c0-e93119ab170c";

const initLetterMatrix: Letter[][] = [
  [{}, {}, {}, {}],
  [{}, {}, {}, {}],
  [{}, {}, {}, {}],
  [{}, {}, {}, {}],
];

export function Boggle() {
  const [letterMatrix, setLetterMatrix] = useState(initLetterMatrix);
  const [wordDefs, setWordDef] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string | undefined>(undefined);
  const [didSubmit, setDidSubmit] = useState(false);

  /**
   * Resets the board with random letters
   */
  const resetMatrix = () => {
    const newLetterMatrix = new Array(4);
    const lettersFromDice = generate16LettersFromDice();
    let letterIndex = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (j === 0) {
          newLetterMatrix[i] = new Array(4);
        }
        newLetterMatrix[i][j] = lettersFromDice[letterIndex];
        letterIndex++;
      }
    }
    setLetterMatrix(newLetterMatrix);
  };

  /**
   * Returns a list of Indexes for the `phrase` that was searched for, starting at
   * `index` of the phrase, given index 0 of the phrase is at supplied (x, y)
   */
  const searchNeighbors = (
    x: number,
    y: number,
    phrase: string,
    index: number,
    usedIndexes: Indexes[]
  ): false | Indexes[] => {
    let char = phrase.charAt(index);
    // If q in search, we must search for "letter" with qu
    if (char === "Q") {
      char += "U";
    }
    for (const xInc of [-1, 0, 1]) {
      if (x + xInc < 0 || x + xInc > 3) continue;
      for (const yInc of [-1, 0, 1]) {
        if (y + yInc < 0 || y + yInc > 3) continue;
        const currentIndexes: Indexes = {
          x: x + xInc,
          y: y + yInc,
        };
        // If it matches and is not the current char and has not been used before
        if (
          letterMatrix?.[x + xInc]?.[y + yInc].value === char &&
          !(yInc === 0 && xInc === 0) &&
          !usedIndexes.find(
            (v) => v.x === currentIndexes.x && v.y === currentIndexes.y
          )
        ) {
          usedIndexes.push(currentIndexes);
          // If last one, return all indexes used
          // If it ends in "QU", special check (is there such a word??)
          if (
            index === phrase.length - 1 ||
            (char === "QU" && index === phrase.length - 2)
          ) {
            return usedIndexes;
          }
          // If not last, go one level deeper
          const neighbors = searchNeighbors(
            currentIndexes.x,
            currentIndexes.y,
            phrase,
            index + 1 + (char === "QU" ? 1 : 0), // If we did Q and U, skip one more letter
            usedIndexes
          );
          if (neighbors) return neighbors;

          // If the search-chain stopped, pop this index
          usedIndexes.pop();
        }
      }
    }
    // If we never found the next char, return false
    return false;
  };

  /**
   * Looks for a supplied phrase on the board.
   * If found, adds colors and arrows to the letters
   */
  const lookForMatch = (phrase: string) => {
    // Reset color and input-word
    colorMatrix([]);
    setInputWord(undefined);
    setDidSubmit(false);
    if (phrase.length < 3) return;

    setInputWord(phrase);

    const searchPhrase = phrase.toUpperCase();
    letterMatrix.forEach((row, x) => {
      row.forEach((letter, y) => {
        if (letter.value === searchPhrase.charAt(0)) {
          const result = searchNeighbors(x, y, searchPhrase, 1, [{ x, y }]);
          if (result) {
            console.log(result);
            colorMatrix(result);
            return result;
          }
        }
        // If we start with QU, special handling
        if (letter.value === "QU" && searchPhrase.slice(0, 2) === "QU") {
          const result = searchNeighbors(x, y, searchPhrase, 2, [{ x, y }]);
          if (result) {
            console.log(result);
            colorMatrix(result);
            return result;
          }
        }
      });
    });
  };

  /**
   * Colors the letters in the supplied indexes and adds arrows between
   * subsequent indexes
   */
  const colorMatrix = (indexes: Indexes[]) => {
    console.log(indexes);
    for (const row of letterMatrix) {
      for (const letter of row) {
        letter.color = "bisque";
        letter.arrowTo = undefined;
      }
    }
    for (let i = 0; i < indexes.length; i += 1) {
      const index = indexes[i];
      const nextIndex = indexes.at(i + 1);
      if (i === 0) {
        letterMatrix[index.x][index.y].color = "#238b45";
      }

      if (nextIndex) {
        letterMatrix[index.x][index.y].arrowTo = indexDifference(
          nextIndex,
          index
        );
      }
    }
    const newLetterMatrix = letterMatrix.slice();

    setLetterMatrix(newLetterMatrix);
  };

  /**
   * Looks up word stored in `inputWord` on Merriam-Webster and sets the
   * `wordInfo` state with a list of short definitions if the word is found
   */
  const checkWordOnMW = async () => {
    setWordDef([]);

    if (!inputWord) return;
    const result =
      await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${inputWord}?key=${MW_API_KEY}
`);

    const wordInfo = (await result.json()) as unknown as {
      shortdef: string[];
    }[];

    setDidSubmit(true);

    if (!wordInfo?.[0]?.shortdef?.[0]) {
      setWordDef([]);
      return;
    }

    setWordDef(wordInfo.map((info) => info?.shortdef?.[0]).filter((v) => !!v));
  };

  return (
    <Stack direction="row" spacing="2rem" paddingX={"20rem"}>
      <Grid2
        container
        spacing={1.5}
        sx={{ backgroundColor: "secondary.main", width: "37rem", height: "37rem", padding: '1rem', borderRadius: '2rem' }}
      >
        {letterMatrix.flat().map((l) => createLetter(l))}
      </Grid2>
      <Stack>
        <Box>
          <Button variant="contained" color="secondary" onClick={resetMatrix}>
            Reset
          </Button>
        </Box>
        <Stack
          direction="row"
          spacing="1rem"
          sx={{ paddingY: "2rem", height: "4rem" }}
        >
          <TextField
            color="secondary"
            label="Word Check"
            focused
            onChange={(event) => lookForMatch(event.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={checkWordOnMW} sx={{height: '3.5rem'}}>
            Submit
          </Button>
        </Stack>
        <Box maxWidth={"32rem"} >
          {didSubmit && (
            <List>
              {!!wordDefs.length ? (
                wordDefs.map((def) => (
                  <>
                    <ListItem sx={{ borderRadius: '1rem',color: 'secondary.contrastText', backgroundColor: "secondary.main", padding: '0.5rem' }} disablePadding>
                      <ListItemText>{def[0].toUpperCase() + def.slice(1)}</ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                ))
              ) : (
                <>
                  <ListItem sx={{ backgroundColor: "red" }}>
                    <ListItemText>{"Not a word"}</ListItemText>
                  </ListItem>
                </>
              )}
            </List>
          )}
        </Box>
      </Stack>
    </Stack>
  );
}
