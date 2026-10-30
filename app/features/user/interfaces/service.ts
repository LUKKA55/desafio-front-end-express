export interface ILoginModel {
    message: string
    token?: string
}

export interface IUserService {
    login(userName: string, password: string): Promise<ILoginModel>;
}