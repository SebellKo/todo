import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import { categoriesState, categoryState, toDoSelector } from '../atoms';
import ToDo from './ToDo';
import { useState } from 'react';
import EditCategory from './EditCategory';

function ToDoList() {
  const [isEdit, setIsEdit] = useState(false);
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onClick = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categories?.map((categoryItem) => (
          <option value={categoryItem}>{categoryItem}</option>
        ))}
      </select>
      <button onClick={onClick}>Edit</button>
      {isEdit && <EditCategory></EditCategory>}
      <CreateToDo></CreateToDo>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo}></ToDo>
      ))}
    </div>
  );
}

export default ToDoList;
