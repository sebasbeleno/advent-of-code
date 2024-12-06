import { readFile } from "../../../utils/deno.ts";

function parseInput(input: string[]) {
  let reachedEndOfFirstHalf = false;
  const orderingRules = [];
  const updateList = [];

  for (const line of input) {
    if (line === "") {
      reachedEndOfFirstHalf = true;
      continue;
    }
    if (reachedEndOfFirstHalf) {
      updateList.push(line.split(","));
    } else {
      orderingRules.push(line);
    }
  }

  return { orderingRules, updateList };
}

function part1({
  orderingRules,
  updateList,
}: {
  orderingRules: string[];
  updateList: string[];
}) {
  const rules = new Map<string, string[]>();

  for (const rule of orderingRules) {
    const [mustBeBefore, mustBeAfter] = rule.split("|");

    if (!rules.has(mustBeAfter)) {
      rules.set(mustBeAfter, []);
    }
    rules.get(mustBeAfter)!.push(mustBeBefore);
  }

  for (let i = 0; i < updateList.length; i++) {
    const page = updateList[i];

    // iterate from the start of the array and the current index
    for (let j = 0; j < i; j++) {
      const before = page[j]
      console.log({before})
    }
  }
}

function isValidUpdate({
  orderingRules,
  update,
}: {
  orderingRules: Map<string, string[]>;
  update: string;
}) {
  for (const page of update) {
    const rules = orderingRules.get(page);

    console.log({
      page,
      rules,
    })
  }
  return true;
}

async function main() {
  const lines = await readFile("../input.txt");
  const { orderingRules, updateList } = parseInput(lines);

  const part1Result = part1({
    orderingRules,
    updateList,
  });
}

main();
