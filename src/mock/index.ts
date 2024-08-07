type StatusDataType = {
  status: number;
  data: string;
};

class Random {
  public random: number;

  constructor(private number: number) {
    this.number = number;
    this.random = 0;
  }

  get() {
    return Math.floor(Math.random() * this.number);
  }
}

export const getSometimeError = (): Promise<StatusDataType> => {
  const status = [
    { status: 500, data: "Error" },
    { status: 404, data: "Not Found" },
    { status: 200, data: "Success" },
  ];

  return new Promise((resolve) => {
    const index = new Random(3).get();
    resolve(status[index]);
  });
};

export enum Role {
  Admin,
  Guest,
}

type UserRole = {
  status: Role.Admin | Role.Guest;
};

type UserResponse = {
  access: boolean;
  token: string | null;
};

interface UserInfoStatus {
  role: UserRole;
  data: UserResponse;
}

export const getUserRole = (): Promise<UserInfoStatus> => {
  const response: UserInfoStatus[] = [
    { role: { status: Role.Admin }, data: { access: true, token: "efv2q3ektfghj32ktrjhb" } },
    { role: { status: Role.Admin }, data: { access: false, token: null } },
    { role: { status: Role.Guest }, data: { access: true, token: "oeifhcve2uifasdfasdss" } },
    { role: { status: Role.Guest }, data: { access: false, token: null } },
  ];

  return new Promise((resolve) => {
    const index = new Random(response.length).get();
    return resolve(response[index]);
  });
};
