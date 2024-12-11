import { readFile, replaceCharAt } from "../../../utils/deno.ts";

function part1(map: string[]) {
  let [row, col] = searchStartPosition(map);
  let steps = 1;

  while (true) {
    renderMap(map);
    const { x: newCol, y: newRow } = getFordwardPosition(col, row, map);

    if (
      newCol < 0 ||
      newCol >= map.length ||
      newRow < 0 ||
      newRow >= map[0].length
    ) {
      break;
    }

    if (map[newCol][newRow] === "#") {
      const { newPosition, characterDirection } = turn90Degrees(
        { col, row },
        map[col][row]
      );

      map = updateCharacterPositionOnMap(
        map,
        { col, row },
        newPosition,
        characterDirection
      );

      row = newPosition.row;
      col = newPosition.col;
      steps++;
      continue;
    }

    const nextPosition = map[newCol][newRow];

    if (nextPosition === "X") {
      map = updateCharacterPositionOnMap(
        map,
        { col, row },
        { col: newCol, row: newRow },
        map[col][row]
      );

      row = newRow;
      col = newCol;
      continue;
    } else {
      map = updateCharacterPositionOnMap(
        map,
        { col, row },
        { col: newCol, row: newRow },
        map[col][row]
      );

      row = newRow;
      col = newCol;
      steps++;
      continue;
    }
  }

  return steps;
}

function getFordwardPosition(col: number, row: number, map: string[]) {
  const character = map[col][row];

  if (character === "^") {
    return { x: col - 1, y: row };
  } else if (character === "v") {
    return { x: col + 1, y: row };
  } else if (character === "<") {
    return { x: col, y: row - 1 };
  } else {
    return { x: col, y: row + 1 };
  }
}

function turn90Degrees(
  characterCurrentPosition: { col: number; row: number },
  direction: string
) {
  if (direction === "^") {
    return {
      newPosition: {
        col: characterCurrentPosition.col,
        row: characterCurrentPosition.row + 1,
      },
      characterDirection: ">",
    };
  } else if (direction === ">") {
    return {
      newPosition: {
        col: characterCurrentPosition.col + 1,
        row: characterCurrentPosition.row,
      },
      characterDirection: "v",
    };
  } else if (direction === "v") {
    return {
      newPosition: {
        col: characterCurrentPosition.col,
        row: characterCurrentPosition.row - 1,
      },
      characterDirection: "<",
    };
  } else {
    return {
      newPosition: {
        col: characterCurrentPosition.col - 1,
        row: characterCurrentPosition.row,
      },
      characterDirection: "^",
    };
  }
}
function updateCharacterPositionOnMap(
  map: string[],
  currentPosition: { col: number; row: number },
  newPosition: { col: number; row: number },
  characterDirection: string
) {
  map[currentPosition.col] = replaceCharAt(
    map[currentPosition.col],
    currentPosition.row,
    "X"
  );
  map[newPosition.col] = replaceCharAt(
    map[newPosition.col],
    newPosition.row,
    characterDirection
  );

  return map;
}

function searchStartPosition(map: string[]) {
  let row = 0;
  let col = 0;

  for (let i = 0; i < map.length; i++) {
    const index = map[i].indexOf("^");

    if (index !== -1) {
      row = index;
      col = i;
      break;
    }
  }

  return [row, col];
}

async function main() {
  const input = await readFile("../input.txt");

  const part1Result = part1(input);

  console.log(part1Result);
}

function renderMap(map: string[]) {
  map.forEach((row) => {
    console.log(row);
  });

  console.log("\n");
}

main();
