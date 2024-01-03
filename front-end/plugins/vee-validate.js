// plugins/vee-validate.js

import { defineNuxtPlugin } from '#app';

import {
  defineRule,
  configure,
  extend,
  Field,
  Form,
  ErrorMessage,
} from 'vee-validate';
import { required, email, min, regex } from '@vee-validate/rules';

// Register the rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('regex', regex);

// Set up the configuration
configure({
  generateMessage: (ctx) => ctx.message,
});

// Define custom rules
extend('noNumbers', {
  validate: (value) => !/\d/.test(value),
  message: 'The {field} field should not contain numbers.',
});

extend('customMin', {
  validate: (value, { length }) => value.length >= length,
  params: ['length'],
  message: 'The {field} field should be at least {length} characters long.',
});


export default defineNuxtPlugin(() => {})
