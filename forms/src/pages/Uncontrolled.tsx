import { ChangeEvent, useState } from 'react';
import { formSchema } from '../utils/validationSchema';
import { ValidationError } from 'yup';
import { handleFileUpload } from '../utils/helpers';
import useForms from '../hooks/useForms';
import { useNavigate } from 'react-router-dom';

type Errors = Record<string, string>;

function Uncontrolled() {
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [files, setFiles] = useState<null | FileList>(null);
  const { addToUncontrolled } = useForms();
  const navigate = useNavigate();

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    await handleFileUpload(e, setPreview);
    setFiles(e.target.files);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = (e.target as HTMLFormElement).elements as unknown as Record<
      string,
      HTMLInputElement
    >;

    const submitData = {
      name: form.name.value,
      age: Number(form.age.value),
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      country: form.country.value,
      gender: form.gender.value,
      terms: form.terms.checked,
      image: files,
    };

    try {
      await formSchema.validate(submitData, { abortEarly: false });
      setErrors({});
      addToUncontrolled({ ...submitData, image: preview as string });
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors: Errors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            if (error.path === 'password') {
              newErrors[error.path] = error.errors[0];
            } else {
              newErrors[error.path] = error.message;
            }
          }
        });
        setErrors(newErrors);
      } else {
        console.warn(err);
      }
    }
  }

  return (
    <div className="wrapper">
      <h2> Uncontrolled Form</h2>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <input type="text" placeholder="name" name="name" />
        {errors.name && <p>{errors.name}</p>}
        <input type="number" placeholder="age" name="age" />
        {errors.age && <p>{errors.age}</p>}
        <input type="text" placeholder="e-mail" name="email" />
        {errors.email && <p>{errors.email}</p>}
        <input type="text" placeholder="password" name="password" />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="text"
          placeholder="confirm password"
          name="confirmPassword"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <input type="text" placeholder="country" name="country" />
        {errors.country && <p>{errors.country}</p>}
        <select defaultValue="" name="gender">
          <option value="" disabled>
            -- Gender --
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender}</p>}
        <input
          type="file"
          name="image"
          onChange={async (e) => await handleFileChange(e)}
        />
        {errors.image && <p>{errors.image}</p>}
        {preview && <img src={preview} alt="preview" />}
        <label>
          <span>I accept Terms and Conditions agreement</span>
          <input type="checkbox" name="terms" />
          {errors.terms && <p>{errors.terms}</p>}
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Uncontrolled;
