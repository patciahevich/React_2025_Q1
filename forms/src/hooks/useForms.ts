import { useAppSelector, useAppDispatch } from '../store/hooks/useAppSelector';
import { add } from '../store/slices/formSlice';
import { FormData } from '../utils/types';

function useForms() {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.forms.allForms);

  const addForm = function (data: FormData) {
    dispatch(add(data));
  };

  return { forms, addForm };
}

export default useForms;
