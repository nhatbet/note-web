type Account = {
    username: string
    password: string
    remember: boolean
}

type AccountError = {
    username: string[]
    password: string[]
}

type AccountRegister = {
    email: string
    name: string
    username: string
    password: string
    password_confirmation: string
}

type AccountRegisterError = {
    email: []
    name: []
    username: []
    password: []
    password_confirmation: []
}

type UserInfo = {
    id: number
    email: string
    name: string
    avatar: string
    created_at: string
}

export type { Account, AccountError, AccountRegister, AccountRegisterError, UserInfo }
