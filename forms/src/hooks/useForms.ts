import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { add } from '../store/slices/formSlice';

function useForms() {
  const dispatch = useDispatch();
  const forms = useAppSelector((state) => state.forms.allForms);

  const addForm = function (data: FormData) {
    dispatch(add(data));
  };

  return { forms, addForm };
}

export default useForms;
