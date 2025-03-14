import { useAppSelector, useAppDispatch } from '../store/hooks/useAppSelector';
import {
  addToControlledForms,
  addToUncontrolledForms,
} from '../store/slices/formSlice';
import { FormData } from '../utils/types';

function useForms() {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.forms.allForms);

  const addToUncontrolled = function (data: FormData) {
    dispatch(addToUncontrolledForms(data));
  };

  const addToControlled = function (data: FormData) {
    dispatch(addToControlledForms(data));
  };

  const hasForms = function () {
    return forms.controlled.length || forms.uncontrolled.length;
  };

  return { forms, addToUncontrolled, addToControlled, hasForms };
}

export default useForms;
