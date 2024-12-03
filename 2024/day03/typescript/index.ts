import { readFile } from "../../../utils/deno.ts";

function part1(string: string) {
  let ans = 0;
  const matches = string.matchAll(/mul\(\d+,\d+\)/g);

  for (const match of matches) {
    const mul = match[0].replace("mul(", "").replace(")", "").split(",");

    ans += parseInt(mul[0]) * parseInt(mul[1]);
  }
  return ans;
}

function part2(string: string) {
  let ans = 0;
  const matches = string.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

  let allow = true;
  for (const match of matches) {
    const exp = match[0];

    if (exp == "do()") {
      allow = true;
    } else if (exp == "don't()") {
      allow = false;
    } else {
        if (allow) {
          const mul = exp.replace("mul(", "").replace(")", "").split(",");
          ans += parseInt(mul[0]) * parseInt(mul[1]);
        }
    }

  }
  return ans;
}

async function main() {
  const file = (await readFile("../input.txt")).join("\n");
  console.time("part1");
  const part1Ans = part1(file);
  console.timeEnd("part1");
  console.log(part1Ans);

  console.time("part2");
  const part2Ans = part2(file);
  console.timeEnd("part2");
  console.log(part2Ans);
}

main();
