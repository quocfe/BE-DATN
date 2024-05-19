import { body } from 'express-validator'

class interestValidator {
  checkInterestInput() {
    return [body('interest_name').notEmpty().withMessage('Tên sở thích không được để trống')]
  }
}

export default new interestValidator()
