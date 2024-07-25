import fs from "fs";
import path from "path";

import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { exec } from "child_process";
import { match, P } from "ts-pattern";

const readDirs = () => {
  const files = fs.readdirSync(path.resolve(__dirname, "."));
  const exceptRootFile = files.filter((file) => file !== "index.ts");
  return exceptRootFile.map((file, idx) => `${idx + 1}: ${file}`);
};

const spawnProcess = (file: string) => {
  exec(`tsx ./src/${file}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`error: ${err}`);
      return;
    }

    console.log(stdout);
  });
};

(async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const choiceArray = readDirs();
  const choiceString = choiceArray.join(`\n`);
  const questionMessage = "테스트할 메소드의 번호를 선택해 주세요.";
  const answer = await rl.question(`${questionMessage}\n${choiceString}\n`);

  match(Number(answer))
    .with(NaN, () => console.log("NaN입니다."))
    .with(P.number, () => {
      const splitFileName = choiceArray[Number(answer) - 1].split(" ")[1];
      spawnProcess(splitFileName);
    });
})();
