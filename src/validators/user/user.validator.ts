import { check, ValidationChain } from 'express-validator';
import { isEmail, isPassword, isEmailExists, isValidPassword } from '../common/common.validator';

const emailValidator = isEmail('email', 'email is incorrect');
const emailExistsValidator = isEmailExists('email', 'email already exists');

const passwordValidator = isValidPassword('password', 'password is not valid');
const newPasswordValidator = isPassword('newPassword', 'new password is incorrect');

const nameValidator = check('profile.name', 'name is incorrect').isString();
const locationValidator = check('profile.location', 'location is incorrect').isString();

export const updateEmail: ValidationChain[] = [emailValidator, emailExistsValidator];
export const updatePassword: ValidationChain[] = [passwordValidator, newPasswordValidator];
export const updateProfile: ValidationChain[] = [nameValidator, locationValidator];
