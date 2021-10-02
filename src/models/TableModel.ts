import UserModel from './UserModel'

export default interface TableModel {
  author: UserModel

  _id: string
  fullname: string
  age?: string
  position?: string
  money?: string
  degree?: string
}
