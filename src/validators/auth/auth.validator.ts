import { ValidationChain } from 'express-validator';
import { isEmail, isPassword, isEmailExists } from '../common/common.validator';

const emailValidator = isEmail('email', 'email is incorrect');
const passwordValidator = isPassword('password', 'password is incorrect');
const emailExistsValidator = isEmailExists('email', 'email already exists');

export const signUp: ValidationChain[] = [emailValidator, passwordValidator, emailExistsValidator];
export const signIn: ValidationChain[] = [emailValidator];
