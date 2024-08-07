type StatusDataType = {
  status: number;
  data: string;
};

class Random {
  public random: number;

  constructor(private number: number) {
    this.random = Math.floor(Math.random() * number);
  }

  get() {
    return this.random;
  }
}

export const getSometimeError = (): Promise<StatusDataType> => {
  const status = [
    { status: 500, data: "Error" },
    { status: 404, data: "Not Found" },
    { status: 200, data: "Success" },
  ];

  return new Promise((resolve) => {
    const index = new Random(status.length).get();
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

type User = {
  name: string;
  age: number;
};

type Expired = {
  date: number;
  status: boolean | null;
};

interface UserSession {
  user: User;
  expired: Expired;
}

export const tokenExpiredStatus = (): Promise<UserSession> => {
  const response: UserSession[] = [
    { user: { name: "mati", age: 11 }, expired: { status: true, date: 0 } },
    { user: { name: "tobi", age: 18 }, expired: { status: false, date: 2000 } },
    { user: { name: "robin", age: 18 }, expired: { status: false, date: 3000 } },
    { user: { name: "dorothy", age: 22 }, expired: { status: null, date: 0 } },
  ];

  return new Promise((resolve) => {
    const index = new Random(response.length).get();
    return resolve(response[index]);
  });
};
