#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

const apiLink: string =
  "https://opentdb.com/api.php?amount=6&category=18&difficulty=medium&type=multiple";

let fetchData = async (data: string) => {
  let fetchQuiz = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};
let data = await fetchData(apiLink);

let startQuiz = async () => {
  let score: number = 0;
  //for user name
  let name = await inquirer.prompt({
    type: "input",
    name: "Fname",
    message: "Enter your Name?",
  });
  for (let i = 1; i < 6; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];
    let ans = await inquirer.prompt({
      type: "list",
      name: "quiz",
      message: data[i].question,
      choices: answers.map((val: string) => val),
    });
    if (ans.quiz === data[i].correct_answer) {
      ++score;
      console.log(chalk.bold.italic.blue("Correct"));
    } else {
      console.log(
        `Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`
      );
    }
  }
  console.log(
    `Your${chalk.green.bold(name.Fname)}, your score is ${chalk.red.bold(
      score
    )} out of ${chalk.red.bold("5")}`
  );
};
startQuiz();