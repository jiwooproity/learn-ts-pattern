import { match, P } from "ts-pattern";
import { getSometimeError, getUserRole } from "./mock";
import { Role } from "./mock";

(async () => {
  const response = await getSometimeError();

  match(response)
    .with({ status: 200 }, () => console.log("Success"))
    .with({ status: 500 }, () => console.log("Server Error"))
    .with({ status: 404 }, () => console.log("Not Found"));
})();

type ReturnType = {
  status: "Success" | "Failed" | "Idle";
  data: string | null;
};

(async () => {
  const { role, data } = await getUserRole();

  const user = match([role, data])
    .returnType<ReturnType>()
    .with([{ status: Role.Admin }, { access: true, token: P.string }], ([_, data]) => ({
      status: "Success",
      data: data.token,
    }))
    .with([{ status: Role.Admin }, { access: false, token: P.string }], ([_, data]) => ({
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
