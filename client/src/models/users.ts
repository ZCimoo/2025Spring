import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: string
  birthDate: Date
  image: string
  university: string
  role: string
}

export function getAll(): Promise<DataListEnvelope<User>> {
  return api('users')
}
export function get(id: string): Promise<User> {
  return api(`users/${id}`)
}
export function searchUsers(
  search: string,
  page: number,
  size: number,
): Promise<DataListEnvelope<User>> {
  return api(`users/search?search=${search}&page=${page}&size=${size}`)
}
