import { useForm } from 'react-hook-form';
import { FormData } from '../utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../utils/validationSchema';
import { useState } from 'react';
import convertFileToBase64 from '../utils/convertFile';

function Controlled() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const base64String = await convertFileToBase64(file);
        setPreview(base64String);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const resetImage = function () {
    setValue('image', undefined);
    setPreview(null);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="wrapper">
      <h1>This is Controlled form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} placeholder="name" />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="number" {...register('age')} placeholder="age" />
        {errors.age && <p>{errors.age.message}</p>}
        <input type="text" {...register('email')} placeholder="e-mail" />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="text" {...register('password')} placeholder="password" />
        {errors.password && <p>{errors.password.message}</p>}
        {errors.password?.types?.lowercase && (
          <p>{errors.password.types.lowercase}</p>
        )}
        {errors.password?.types?.uppercase && (
          <p>{errors.password.types.uppercase}</p>
        )}
        {errors.password?.types?.number && (
          <p>{errors.password.types.number}</p>
        )}
        {errors.password?.types?.special && (
          <p>{errors.password.types.special}</p>
        )}
        <input
          type="text"
          {...register('confirmPassword')}
          placeholder="confirm password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <input type="text" {...register('country')} placeholder="country" />
        {errors.country && <p>{errors.country.message}</p>}

        <div className="gender">
          <label>
            <input type="radio" value="male" {...register('gender')} />
            <span>Male</span>
          </label>

          <label>
            <input type="radio" value="female" {...register('gender')} />
            <span>Female</span>
          </label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
        <label>
          <span>Please, add the image</span>
          <input
            type="file"
            {...register('image')}
            onChange={handleFileUpload}
          />
        </label>
        {errors.image && <p>{errors.image.message}</p>}
        {preview && <img src={preview} alt="preview" />}
        {preview && (
          <button type="button" onClick={resetImage}>
            Delete the file
          </button>
        )}

        <label>
          <span>I accept Terms and Conditions agreement</span>
          <input type="checkbox" {...register('terms')} />
        </label>
        {errors.terms && <p>{errors.terms.message}</p>}
        <button type="submit">submit form</button>
      </form>
    </div>
  );
}

export default Controlled;
