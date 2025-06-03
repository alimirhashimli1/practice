export type User = {
    id: number,
    username: string,
    email: string,
    password: string
}

export type UserLogin = {
    email: string,
    password: string
}