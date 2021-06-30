//
//      Interface Token
//

export type token = string

export interface AccessToken {
    _id?: any,
    token: token,
    expires_at: number,
    user_id: any
}
