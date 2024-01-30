type Account = {
    username: string,
    password: string,
    remember: boolean
}

type AccountError = {
    username: [],
    password: [],
}

type AccountRegister = {
    email: string,
    name: string,
    username: string,
    password: string,
    password_confirmation: string
}

type AccountRegisterError = {
    email: [],
    name: [],
    username: [],
    password: [],
    password_confirmation: []
}

export type { Account, AccountError, AccountRegister, AccountRegisterError };
