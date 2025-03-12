export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
  image?: string;
  terms?: boolean;
};

export type SubmitData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
  image?: FileList;
  terms?: boolean;
};
