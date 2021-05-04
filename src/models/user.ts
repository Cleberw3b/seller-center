//
//      Interface User
//

export type Role = 'super' | 'admin' | 'seller' | 'user'

export interface User {
    _id?: any,
    username?: string,
    email: string,
    password?: string,
    role: Role,
    isActive: boolean
}
