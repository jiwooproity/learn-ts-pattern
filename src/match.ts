import { match, P } from "ts-pattern";
import { lineMsg } from "./utils/message";

type Data =
  | { type: "image"; value: string }
  | { type: "text"; value: string }
  | { type: "link"; value: string };
type Result = { type: "ok"; data: Data } | { type: "error"; error: Error };

const RESULT_SUCCESS: Result[] = [
  { type: "ok", data: { type: "image", value: "https://www.jiwoo.so/image/data.png" } },
  { type: "ok", data: { type: "text", value: "Hi Everyone" } },
  { type: "ok", data: { type: "link", value: "https://www.jiwoo.so/" } },
];
const RESULT_ERROR: Result = { type: "error", error: new Error("An occured Error!!") };

const TYPES = [1, "string", true, null];
const TEMPLATES = [
  { type: "image", value: "https://www.jiwoo.so/image/data.png" },
  { type: "text", value: "Hi Hello" },
  { type: "link", value: "https://www.jiwoo.so/" },
];

(() => {
  lineMsg("match, with 메소드를 활용한 패턴 매칭을 시작합니다.");

  TYPES.forEach((type) => {
    match(type)
      .with(P.number, () => console.log(`${type}는 숫자 타입입니다.`))
      .with(P.string, () => console.log(`${type}는 문자열 타입입니다.`))
      .with(P.boolean, () => console.log(`${type}는 불리언 타입입니다.`))
      .otherwise(() => console.log(`${type}는 대상에 포함되어 있지 않습니다.`));
  });

  lineMsg("match, with 메소드를 활용한 패턴 매칭을 종료합니다.");
})();

console.log("\n");

(() => {
  lineMsg("P.union을 활용한 두가지 타입에 대한 패턴 매칭을 실행합니다.");

  TEMPLATES.forEach((template) => {
    match(template)
      .with({ type: P.union("image", "text") }, () =>
        console.log(`${template.type} 타입이며, 값은 ${template.value}입니다.`)
      )
      .otherwise(() => console.log(`${template.type} 타입은 매칭 식별에서 제외된 타입입니다.`));
  });

  lineMsg("P.union을 활용한 두가지 타입에 대한 패턴 매칭을 종료합니다.");
})();

(() => {
  lineMsg("with메소드를 exhaustive 메소드를 활용하여 철저한 매칭을 실행합니다.");

  const isHTML = (res: Result) => {
    return match(res)
      .with({ type: "error" }, () => "Any error!!")
      .with(
        { type: "ok", data: { type: "text", value: P.string } },
        (res) => `<span>${res.data.value}</span>`
      )
      .with(
        { type: "ok", data: { type: "image", value: P.select() } },
        (src) => `<img src=${src} />`
      )
      .with(
        { type: "ok", data: { type: "link", value: P.string } },
        (res) => `<a href=${res.data.value}></a>`
      )
      .exhaustive();
  };

  const html = [RESULT_ERROR, ...RESULT_SUCCESS].map(isHTML);
  console.log(html);

  lineMsg("with메소드를 exhaustive 메소드를 활용하여 철저한 매칭을 종료합니다.");
})();
