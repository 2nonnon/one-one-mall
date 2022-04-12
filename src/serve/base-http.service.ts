import { AxiosResponse } from 'axios'
import axios from 'axios'

console.log(process.env.NODE_ENV)
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'product' ? 'https://api.nnln.love' : '/api',
  timeout: 30000,
})

export default class BaseHttpService {
  _accessToken = ''

  async get(
    endpoint: string,
    options = {}
  ): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .get(`/${endpoint}`, options)
      .catch(error => this._handleHttpError(error))
  }

  async post(
    endpoint: string,
    data = {},
    options = {}
  ): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .post(`/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error))
  }

  async delete(
    endpoint: string,
    options = {}
  ): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .delete(`/${endpoint}`, options)
      .catch(error => this._handleHttpError(error))
  }

  async patch(
    endpoint: string,
    data = {},
    options = {}
  ): Promise<void | AxiosResponse<any, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .patch(`/${endpoint}`, data, options)
      .catch(error => this._handleHttpError(error))
  }

  _handleHttpError(error: any): void {
    const { statusCode } = error.response.data
    console.log(error.response.data)
    if (statusCode === 401) {
      return this._handle401()
    } else if (statusCode === 404) {
      return
    } else {
      throw error
    }
  }

  _handle401(): void {
    window.location.hash = '/signin'
  }

  _getCommonOptions(): {
    headers: {
      'Content-Type': string
      Authorization: string
    }
  } {
    const token = this.loadToken()

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  }

  get accessToken(): string | null {
    return this._accessToken ? this._accessToken : this.loadToken()
  }

  saveToken(accessToken: string): void {
    this._accessToken = accessToken
    return localStorage.setItem('accessToken', accessToken)
  }

  loadToken(): string {
    const token = localStorage.getItem('accessToken') ?? ''
    this._accessToken = token
    return token
  }

  removeToken(): void {
    this._accessToken = ''
    localStorage.removeItem('accessToken')
  }
}

export const base = new BaseHttpService()
