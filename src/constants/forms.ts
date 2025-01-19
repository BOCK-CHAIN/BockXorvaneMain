type TypeProps = {
  id: string;
  type: "email" | "text" | "password" | "number";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const USER_SIGNUP_FORM: TypeProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Full name",
    name: "fullname",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Confrim Password",
    name: "confirmPassword",
    type: "password",
  },
];

export const USER_LOGIN_FORM: TypeProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

export const USER_FORGOT_PASSWORD_FORM: TypeProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
  },
];

