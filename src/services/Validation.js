import Joi from "joi";

export const emailValidator = (email, helper) => {
  if (email.includes("gmail.com") || email.includes("naver.com")) {
    return helper.message("회사 메일이 아닙니다.");
  }

  if (!email.includes("@")) {
    return helper.message("이메일 형식이 아닙니다.");
  }

  return email;
};

export const SignUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "이름을 입력해 주세요",
  }),
  email: Joi.string().custom(emailValidator).required().messages({
    "string.empty": "이메일을 입력해주세요",
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "비밀번호를 입력해주세요",
    "string.min": "비밀번호는 최소 3 자리 이상이어야 합니다.",
  }),
  company: Joi.string().required().messages({
    "string.empty": "재직 중인 회사를 입력해주세요",
  }),
  price: Joi.string().required().messages({
    "string.empty": "가격을 입력해주세요",
  }),
}).unknown();

export const LogInSchema = Joi.object({
  email: Joi.string().custom(emailValidator).required().messages({
    "string.empty": `이메일을 입력해 주세요.`,
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "비밀번호를 입력해 주세요.",
    "string.min": "비밀번호는 최소 3 자리 이상입니다.",
  }),
});
