import { CustomErrorData } from '../types/response.type'

// error handler
export class CustomErrorHandler extends Error {
  status: number
  errorData: string | CustomErrorData

  constructor(status: number, errorData: string | CustomErrorData) {
    super()
    this.status = status
    this.errorData = errorData
  }
}
