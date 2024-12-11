import { readFile, replaceCharAt } from "../../../utils/deno.ts";

function part1(map: string[]) {
  let [row, col] = searchStartPosition(map);
  let steps = 1;

  while (true) {
    //renderMap(map);
    let { x: newCol, y: newRow } = getFordwardPosition(col, row, map);

    if (
      newCol < 0 ||
      newCol >= map.length ||
      newRow < 0 ||
      newRow >= map[0].length
    ) {
      break;
    }

    while (map[newCol][newRow] === "#") {
      const newDirection = turn90Degrees(map[col][row]);
      map = updateCharacterPositionOnMap(map, { col, row }, newDirection);

      const newPosition = getFordwardPosition(col, row, map);

      newCol = newPosition.x;
      newRow = newPosition.y;
    }

    const nextPosition = map[newCol][newRow];

    if (nextPosition === "X") {
      map = updateCharacterPositionOnMap(
        map,
        { col: newCol, row: newRow },
        map[col][row]
      );

      map = markPositionAsVisited(map, { col, row });
      row = newRow;
      col = newCol;
      continue;
    } else {
      map = updateCharacterPositionOnMap(
        map,
        { col: newCol, row: newRow },
        map[col][row]
      );

      map = markPositionAsVisited(map, { col, row });
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

function turn90Degrees(direction: string) {
  if (direction === "^") {
    return ">";
  } else if (direction === ">") {
    return "v";
  } else if (direction === "v") {
    return "<";
  } else {
    return "^";
  }
}
function updateCharacterPositionOnMap(
  map: string[],
  position: { col: number; row: number },
  characterDirection: string
) {
  map[position.col] = replaceCharAt(
    map[position.col],
    position.row,
    characterDirection
  );

  return map;
}

function markPositionAsVisited(
  map: string[],
  position: { col: number; row: number }
) {
  map[position.col] = replaceCharAt(map[position.col], position.row, "X");

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
