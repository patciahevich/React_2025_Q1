import { useForm } from 'react-hook-form';
import { SubmitData } from '../utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../utils/validationSchema';
import { useState } from 'react';
import useForms from '../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { handleFileUpload } from '../utils/helpers';

function Controlled() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const { addToControlled } = useForms();
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: SubmitData) => {
    addToControlled({ ...data, image: preview as string });
    navigate('/');
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

        <select defaultValue="" name="gender">
          <option value="" disabled>
            -- Gender --
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
        <label>
          <span>Please, add the image</span>
          <input
            type="file"
            {...register('image')}
            onChange={(e) => handleFileUpload(e, setPreview)}
          />
        </label>
        {errors.image && <p>{errors.image.message}</p>}
        {preview && <img src={preview} alt="preview" />}

        <label>
          <span>I accept Terms and Conditions agreement</span>
          <input type="checkbox" {...register('terms')} />
        </label>
        {errors.terms && <p>{errors.terms.message}</p>}
        <button type="submit" disabled={!isValid}>
          submit form
        </button>
      </form>
    </div>
  );
}

export default Controlled;
