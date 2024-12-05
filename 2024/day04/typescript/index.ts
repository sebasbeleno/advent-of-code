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
                        counter++
                    }
                }

                // downward
                if (i + 3 < lines.length) {
                    const word = lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
                    if (word === "XMAS") {
                        counter++
                    }
                }

                // upward
                if (i - 3 >= 0) {
                    const word = lines[i - 3][j] + lines[i - 2][j] + lines[i - 1][j] + lines[i][j];
                    if (word === "SAMX") {
                        counter++
                    }
                }

                // diagonal right right
                if (i + 3 < lines.length && j + 3 < lines[i].length) {
                    const word = lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2] + lines[i + 3][j + 3];
                    if (word === "XMAS") {
                        counter++
                    }
                }

                // diagonal left left
                if (i - 3 >= 0 && j - 3 >= 0) {
                    const word = lines[i - 3][j - 3] + lines[i - 2][j - 2] + lines[i - 1][j - 1] + lines[i][j];
                    if (word === "SAMX") {
                        counter++
                    }
                }

                // diagonal right left
                if (i + 3 < lines.length && j - 3 >= 0) {
                    const word = lines[i][j] + lines[i + 1][j - 1] + lines[i + 2][j - 2] + lines[i + 3][j - 3];
                    if (word === "XMAS") {
                        counter++
                    }
                }

                // diagonal left right
                if (i - 3 >= 0 && j + 3 < lines[i].length) {
                    const word = lines[i - 3][j + 3] + lines[i - 2][j + 2] + lines[i - 1][j + 1] + lines[i][j];
                    if (word === "SAMX") {
                        counter++

                    }
                }
            }
        }
    }


    return { counter };
}

// XMAS
function part2() {}

async function main() {
    const file = await readFile("../input.txt");

    console.time("execution time part1");
    const {counter: ansPart1} =  part1(file);
    console.timeEnd("execution time part1");
    console.log("Part 1 answer:", ansPart1);

}

main();