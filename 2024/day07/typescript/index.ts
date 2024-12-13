import { readFile } from "../../../utils/deno.ts";

const parseInput = (input: string[]) => {
  const output: number[][] = [];

  for (let i = 0; i < input.length; i++) {
    const parsedInput = input[i].replace(":", "").split(" ");

    output.push(parsedInput.map((x) => parseInt(x, 10)));
  }

  return output;
};

// todo: get a better name for this function
function getIfPermutationWorks(
  nums: number[],
  target: number,
  currentAcc: number,
  currentIndex: number,
  operation: "+" | "*"
): boolean {
  if (operation === "+") {
    currentAcc += nums[currentIndex];
  } else if (operation === "*") {
    currentAcc = currentAcc * nums[currentIndex];
  }

  if (currentIndex === nums.length - 1) {
    return target === currentAcc;
  }

  return (
    getIfPermutationWorks(nums, target, currentAcc, currentIndex + 1, "+") ||
    getIfPermutationWorks(nums, target, currentAcc, currentIndex + 1, "*")
  );
}

function getEquationResultIfValid(nums: number[]) {
  const target = nums[0];

  return (
    getIfPermutationWorks(nums, target, 0, 1, "+") ||
    getIfPermutationWorks(nums, target, 0, 1, "*")
  );
}

function part1(numbers: number[][]) {
  let ans = 0;

  for (let i = 0; i < numbers.length; i++) {
    const isPermutationValid = getEquationResultIfValid(numbers[i]);

    if (isPermutationValid) {
      ans += numbers[i][0];
    }
  }

  return ans;
}

async function main() {
  const input = await readFile("../input.txt");
  const numbers = parseInput(input);
  const part1Result = part1(numbers);
  console.log(part1Result);
}

main();
