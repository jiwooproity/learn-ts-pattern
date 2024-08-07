# Learn TS Pattern

ts pattern 패턴 매칭 라이브러리를 활용한 간결한 코드를 작성해 보고, 각 메소드를 테스트할 수 있는 환경을 제공해 보고자 합니다.

## 패턴 매칭이란?

코드 분기 기법으로 복잡한 조건에서 명령형 대안 ( 조건문 ) 보다 간결한 경우가 많다.

이러한 ts-pattern은 여러 분기를 통해 검증을 거칠 경우, 케이스에 맞는 결과를 내야하는 경우에 간결한 가독성으로 데이터 제공을 할 수도 있을 것 같습니다.

## 패키지 설치

```
npm install ts-pattern
```
```
yarn install ts-pattern
```

## 라이브러리 사용 시 확인이 필요한 내용

해당 패턴 매칭 라이브러리 ts-pattern 은 tsconfig 설정에 strictMode가 활성화되어 있다는 가정 하에 사용이 가능합니다.

## 예제

### ts-pattern match 메소드로 원하는 분기 결정하기

```
import { match, P } from "ts-pattern";

enum Role {
  Admin,
  Guest
}

class Random() {
  contructor(private number: string) {
    this.number = Math.floor(Math.random() * number);
  }

  get() {
    return this.number;
  }
}

const data = [Role.Admin, Role.Guest];
const random = new Random(data.length).get();

match(data[random])
  .with(Role.Admin, () => console.log("Admin 계정입니다."))
  .with(Role.Guest, () => console.log("Guest 계정입니다."))
```
