import fs from "fs";
import path from "path";

import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { exec } from "child_process";
import { match, P } from "ts-pattern";

const readDirs = () => {
  const files = fs.readdirSync(path.resolve(__dirname, "."));
  const exceptRootFile = files.filter((file) => file !== "index.ts" && file.includes("."));
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
  const splitFileName = choiceArray[Number(answer) - 1].split(" ")[1];
  console.log(`선택하신 메서드를 실행합니다. [${splitFileName}]`);

  match(Number(answer))
    .with(NaN, () => console.log("숫자를 입력해 주세요."))
    .with(P.number, () => {
      spawnProcess(splitFileName);
    });
})();