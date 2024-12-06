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
  updateList: string[][];
}) {
  const rules = new Map<string, string[]>();

  for (const rule of orderingRules) {
    const [key, value] = rule.split("|");

    if (rules.has(key)) {
      rules.get(key)!.push(value);
    } else {
      rules.set(key, [value]);
    }
  }

  let sumOfTheMiddlePagesOfValidUpdates = 0;

  for (const update of updateList) {
    const isValid = isValidUpdate({
      orderingRules: rules,
      update,
    });

    if (isValid) {
      const length = update.length;
      const middleIndex = Math.floor(length / 2);
      const middlePage = update[middleIndex];

      sumOfTheMiddlePagesOfValidUpdates += parseInt(middlePage);
    }
  }

  return sumOfTheMiddlePagesOfValidUpdates;
}

function isValidUpdate({
  orderingRules,
  update,
}: {
  orderingRules: Map<string, string[]>;
  update: string[];
}) {
  // the update array string[]
  for (let i = 0; i < update.length; i++) {
    const currentPage = update[i];

    const rulesForCurrentPage = orderingRules.get(currentPage);

    for (let j = 0; j < i; j++) {
      const prevPage = update[j];
      if (rulesForCurrentPage?.includes(prevPage)) {
        return false;
      }
    }
  }
  return true;
}

async function main() {
  const lines = await readFile("../input.txt");
  const { orderingRules, updateList } = parseInput(lines);

  console.time("execution time part1");
  const part1Result = part1({
    orderingRules,
    updateList,
  });
  console.timeEnd("execution time part1");
  console.log("Part 1 result:", part1Result);
}

main();
