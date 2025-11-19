import { isRef } from "vue";
import { EMAIL_REGEX, URL_REGEX } from "./constants";

export const ValidationRule = {
  Required: "required",
  Email: "email",
  Url: "url",
};

const validationRules = {
  [ValidationRule.Required]: {
    check(value) {
      if (isRef(value)) {
        value = value.value;
      }

      return Boolean(value.trim());
    },
    message: "Поле обязательно для заполнения",
  },
  [ValidationRule.Email]: {
    check(value) {
      if (isRef(value)) {
        value = value.value;
      }

      return value ? EMAIL_REGEX.test(value) : true;
    },
    message: "Электронная почта имеет неверный формат",
  },
  [ValidationRule.Url]: {
    check(value) {
      if (isRef(value)) {
        value = value.value;
      }

      return value ? URL_REGEX.test(value) : true;
    },
    message: "Ссылка имеет неверный формат",
  },
};

const validate = (value, rulesNames) => {
  let error = "";

  rulesNames.forEach((name) => {
    const rule = validationRules[name];

    if (!rule) {
      throw new Error(`Validation rule "${rule}" not found.`);
    }

    if (!rule.check(value)) {
      error = rule.message;
    }
  });

  return error;
};

export const validateFields = (fields, validations) => {
  let isValid = true;

  for (const item in validations) {
    const fieldErrorMessage = validate(fields[item], validations[item].rules);
    validations[item].error = fieldErrorMessage;

    if (isValid && fieldErrorMessage) {
      isValid = false;
    }
  }

  return isValid;
};

export const clearValidationErrors = (validations) => {
  for (const item in validations) {
    validations[item].error = "";
  }
};
