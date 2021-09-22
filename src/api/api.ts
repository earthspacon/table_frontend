import { api } from './api_instanse'
import { AxiosResponse } from 'axios'
import TableModel from 'models/TableModel'
import User from 'models/UserModel'

export async function login(payload: User): Promise<AxiosResponse<User>> {
  return api.post('/login', payload)
}

export async function getData(): Promise<AxiosResponse<TableModel[]>> {
  return api.get('/')
}

export async function addData(
  payload: TableModel
): Promise<AxiosResponse<TableModel>> {
  return api.post('/', payload)
}

export async function editData(id: string, payload: TableModel) {
  return api.put(`/${id}`, payload)
}

export async function deleteData(id: string) {
  return api.delete(`/${id}`)
}

export async function deleteAll() {
  return api.delete('/')
}
