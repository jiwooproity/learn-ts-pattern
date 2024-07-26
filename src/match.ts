import { match, P } from "ts-pattern";

const valueArray = [1, "string", true];

(() => {
  valueArray.forEach((value) => {
    match(value)
      .with(P.number, () => console.log(`${value}는 숫자 타입입니다.`))
      .with(P.string, () => console.log(`${value}는 문자열 타입입니다.`))
      .with(P.boolean, () => console.log(`${value}는 불리언 타입입니다.`));
  });
})();
