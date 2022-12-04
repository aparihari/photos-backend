import mongoose from 'mongoose';
import validator from 'validator';

export const commonValidators = {
  email: [
    {
      validator: (value: string) => validator.isEmail(value),
      message: (props: mongoose.ValidatorProps) =>
        `${props.value} is not a valid email address.`,
    },
  ],
  name: [
    {
      validator: (value: string) => validator.isAlpha(value),
      message: () => 'Name can only contain alphabets!',
    },
  ],
  password: [
    {
      validator: (value: string) => value.length >= 8,
      message: () => 'Password cannot be less than 8 characters.',
    },
    {
      validator: (value: string) => /\d/.test(value),
      message: (props: mongoose.ValidatorProps) =>
        `Password must contain a digit. ${props.value} doesn't contain digits.`,
    },
    {
      validator: (value: string) => /[A-Z]/.test(value),
      message: (props: mongoose.ValidatorProps) =>
        `Password must contain an uppercase letter. ${props.value} doesn't contain an uppercase letter.`,
    },
    {
      validator: (value: string) => /[a-z]/.test(value),
      message: (props: mongoose.ValidatorProps) =>
        `Password must contain an lowercase letter. ${props.value} doesn't contain an lowercase letter.`,
    },
    {
      validator: (value: string) =>
        /[!@#$%^&*()_+\-=\[\]{};'"\\|,.<>\/?]/.test(value),
      message: (props: mongoose.ValidatorProps) =>
        `Password must contain a special character. ${props.value} doesn't contain a special character.`,
    },
  ],
};

export class Validator {
  get(type: string) {
    switch (type) {
      case 'email':
        return commonValidators.email;
      case 'name':
        return commonValidators.name;
      case 'password':
        return commonValidators.password;
    }
  }
}

export default new Validator();
