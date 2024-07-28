import { match, P } from "ts-pattern";
import message from "./utils/message";

const value1 = [1, "string", true, null];
const value2 = [
  { type: "image", value: "https://www.jiwoo.so/image/data.png" },
  { type: "text", value: "Hi Hello" },
  { type: "link", value: "https://www.jiwoo.so/" },
];

(() => {
  message("match, with 메소드를 활용한 패턴 매칭을 시작합니다.");

  value1.forEach((value) => {
    match(value)
      .with(P.number, () => console.log(`${value}는 숫자 타입입니다.`))
      .with(P.string, () => console.log(`${value}는 문자열 타입입니다.`))
      .with(P.boolean, () => console.log(`${value}는 불리언 타입입니다.`))
      .otherwise(() => console.log(`${value}는 대상에 포함되어 있지 않습니다.`));
  });

  message("match, with 메소드를 활용한 패턴 매칭을 종료합니다.");
})();

console.log("\n");

(() => {
  message("P.union을 활용한 두가지 타입에 대한 패턴 매칭을 실행합니다.");

  value2.forEach((value) => {
    match(value)
      .with({ type: P.union("image", "text") }, () =>
        console.log(`${value.type} 타입이며, 값은 ${value.value}입니다.`)
      )
      .otherwise(() => console.log(`${value.type} 타입은 매칭 식별에서 제외된 타입입니다.`));
  });

  message("P.union을 활용한 두가지 타입에 대한 패턴 매칭을 종료합니다.");
})();
