import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { categoriesState } from '../atoms';

interface IForm {
  category: string;
}

function EditCategory() {
  const setCategory = useSetRecoilState(categoriesState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ category }: IForm) => {
    setCategory((prev) => [...prev, category]);
    setValue('category', '');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Edit Category"
        {...register('category', {
          required: 'Please write a To Do',
        })}
      ></input>
      <button>Add</button>
    </form>
  );
}

export default EditCategory;
