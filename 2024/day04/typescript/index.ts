import { readFile } from "../../../utils/deno.ts";

/**
 * NOTE: This solution may be a little bit overkill, but I wanted to make it as generic as possible.
 * I should research a better way to solve this problem. Maybe using a regex or dfs.
 *
 * @param lines the input file
 * @returns the number of times the word "XMAS" appears in the file
 */
function part1(lines: string[]) {
  let counter = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      const currentChar = lines[i][j];
      if (currentChar === "X") {
        // fordward
        if (j + 3 < lines[i].length) {
          const word = lines[i].slice(j, j + 4);
          if (word === "XMAS") {
            counter++;
          }
        }

        if (j - 3 >= 0) {
          const word = lines[i].slice(j - 3, j + 1);
          if (word === "SAMX") {
            counter++;
          }
        }

        // downward
        if (i + 3 < lines.length) {
          const word =
            lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
          if (word === "XMAS") {
            counter++;
          }
        }

        // upward
        if (i - 3 >= 0) {
          const word =
            lines[i - 3][j] + lines[i - 2][j] + lines[i - 1][j] + lines[i][j];
          if (word === "SAMX") {
            counter++;
          }
        }

        // diagonal right right
        if (i + 3 < lines.length && j + 3 < lines[i].length) {
          const word =
            lines[i][j] +
            lines[i + 1][j + 1] +
            lines[i + 2][j + 2] +
            lines[i + 3][j + 3];
          if (word === "XMAS") {
            counter++;
          }
        }

        // diagonal left left
        if (i - 3 >= 0 && j - 3 >= 0) {
          const word =
            lines[i - 3][j - 3] +
            lines[i - 2][j - 2] +
            lines[i - 1][j - 1] +
            lines[i][j];
          if (word === "SAMX") {
            counter++;
          }
        }

        // diagonal right left
        if (i + 3 < lines.length && j - 3 >= 0) {
          const word =
            lines[i][j] +
            lines[i + 1][j - 1] +
            lines[i + 2][j - 2] +
            lines[i + 3][j - 3];
          if (word === "XMAS") {
            counter++;
          }
        }

        // diagonal left right
        if (i - 3 >= 0 && j + 3 < lines[i].length) {
          const word =
            lines[i - 3][j + 3] +
            lines[i - 2][j + 2] +
            lines[i - 1][j + 1] +
            lines[i][j];
          if (word === "SAMX") {
            counter++;
          }
        }
      }
    }
  }

  return { counter };
}

// XMAS
function part2(lines: string[]) {
  let counter = 0;

  const masks = [
    [
      ["M", null, "M"],
      [null, "A", null],
      ["S", null, "S"],
    ],
    [
      ["S", null, "M"],
      [null, "A", null],
      ["S", null, "M"],
    ],
    [
      ["S", null, "S"],
      [null, "A", null],
      ["M", null, "M"],
    ],
    [
      ["M", null, "S"],
      [null, "A", null],
      ["M", null, "S"],
    ],
  ];

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      for (const mask of masks) {
        let found = true;
        for (let x = 0; x < mask.length; x++) {
          for (let y = 0; y < mask[x].length; y++) {
            if (mask[x][y] && mask[x][y] !== lines[i + x]?.[j + y]) {
              found = false;
              break;
            }
          }
        }

        if (found) {
          counter++;
        }
      }
    }
  }

  return counter;
}

async function main() {
  const file = await readFile("../input.txt");

  console.time("execution time part1");
  const { counter: ansPart1 } = part1(file);
  console.timeEnd("execution time part1");
  console.log("Part 1 answer:", ansPart1);

  console.time("execution time part2");
  const ansPart2 = part2(file);
  console.timeEnd("execution time part2");
  console.log("Part 2 answer:", ansPart2);
}

main();
