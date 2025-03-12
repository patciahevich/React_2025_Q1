import * as yup from 'yup';

const maxSize = 2 * 1024 * 1024;
const validFileExtensions = ['jpeg', 'png'];

function isValidFileType(fileName: string) {
  return fileName
    ? validFileExtensions.includes(fileName.split('.')[1])
    : false;
}

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[A-Z][a-z]+$/,
      'First letter must be uppercase, others lowercase'
    ),
  age: yup
    .number()
    .required('Age is required')
    .moreThan(0, 'Age should be more than 0'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email should be valid'),
  password: yup
    .string()
    .required('Password is required')
    .test('number', 'Password should contain at least 1 number', (value) =>
      /[0-9]/.test(value)
    )
    .test(
      'uppercase',
      'Password should contain at least 1 uppercase letter',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'The password should contain at least 1 lowercase letter',
      (value) => /[a-z]/.test(value)
    )
    .test(
      'special',
      'The password should contain at least 1 spacial character (!@#$%^&*)',
      (value) => /[!@#$%^&*]/.test(value)
    ),
  confirmPassword: yup
    .string()
    .required('You should confirm your password')
    .oneOf([yup.ref('password')], 'Passwords should match'),
  country: yup.string().required('Country is required'),
  gender: yup.string().required(),
  image: yup
    .mixed<FileList>()
    .test(
      'required',
      'Pleas, add the image',
      (value) => value instanceof FileList && value.length > 0
    )
    .test(
      'size',
      'File should be less than 2MB',
      (value) => value?.[0] && value[0].size <= maxSize
    )
    .test(
      'type',
      'Image should have extension  .png or .jpeg',
      (value) => value?.[0] && isValidFileType(value[0].name.toLowerCase())
    ),
  terms: yup.boolean().oneOf([true], 'You should accept Terms and Conditions'),
});
