import moment from 'moment'

// Tạo code thời gian hết hạn
export function generateExpiration(amount: number, unit: moment.unitOfTime.DurationConstructor): string {
  return moment().add(amount, unit).toISOString()
}

// Kiểm tra code hết hạn chưa
export function isExpiredBefore(expires: string): boolean {
  const now = moment()
  return moment(expires).isBefore(now)
}

export function isExpiredAfter(expires: string): boolean {
  const now = moment()
  return moment(expires).isAfter(now)
}

export function generateCodeNumbers(digits: number): number {
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  return Math.floor(min + Math.random() * max)
}
