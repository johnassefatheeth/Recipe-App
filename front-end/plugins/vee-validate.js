// plugins/vee-validate.js

import { createApp } from 'vue';
import {
  defineRule,
  configure,
  extend,
  Field,
  Form,
  ErrorMessage,
} from 'vee-validate';
import { required, email, min, regex } from '@vee-validate/rules';

// Install the vee-validate components globally
const app = createApp();

app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);

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

// Initialize vee-validate
app.use({ install: () => {} });
