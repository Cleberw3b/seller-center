import { User } from "../../src/models/account"

export const USER_MOCK_NULL: User = {
    _id: undefined,
    username: undefined,
    email: '',
    password: undefined,
    role: 'user',
    isActive: true
}

export const USER_MOCK_1: User = {
    _id: undefined,
    username: 'example',
    email: 'example@email.com',
    password: 'f0rtePa$s',
    role: 'seller',
    isActive: true
}
