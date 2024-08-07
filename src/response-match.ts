import { match, P } from "ts-pattern";
import { getSometimeError, getUserRole, tokenExpiredStatus } from "./mock";
import { Role } from "./mock";

(async () => {
  const response = await getSometimeError();

  match(response)
    .with({ status: 200 }, () => console.log("Success"))
    .with({ status: 500 }, () => console.log("Server Error"))
    .with({ status: 404 }, () => console.log("Not Found"));
})();

type RoleReturnType = {
  status: "Success" | "Failed" | "Idle";
  data: string | null;
};

(async () => {
  const { role, data } = await getUserRole();

  const user = match([role, data])
    .returnType<RoleReturnType>()
    .with([{ status: Role.Admin }, { access: true, token: P.string }], ([_, data]) => ({
      status: "Success",
      data: data.token,
    }))
    .with([{ status: Role.Admin }, { access: false, token: null }], ([_, data]) => ({
      status: "Failed",
      data: data.token,
    }))
    .with([{ status: Role.Guest }, { access: true, token: P.string }], ([_, data]) => ({
      status: "Success",
      data: data.token,
    }))
    .with(P._, ([_, data]) => ({ status: "Idle", data: data.token }))
    .exhaustive();

  console.log(user);
})();

type TokenInfoReturnType = {
  message: string;
};

(async () => {
  const { user, expired } = await tokenExpiredStatus();

  const tokenInfo = match([user, expired])
    .returnType<TokenInfoReturnType>()
    .with(
      [
        { name: P.string, age: P.number },
        { status: true, date: P.when((t) => t === 0) },
      ],
      () => ({
        message: `The token is Expired`,
      })
    )
    .with(
      [
        { name: P.string, age: P.number },
        { status: false, date: P.when((t) => 3000 <= t) },
      ],
      ([_, status]) => ({
        message: `The token is not yet Expired, a few seconds left ${status.date}`,
      })
    )
    .with(P._, () => ({
      message: "We can't find session status of the token",
    }))
    .exhaustive();

  console.log(tokenInfo);
})();
