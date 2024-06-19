import React from 'react';
import { Categories, IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  console.log(category);
  console.log(Categories.DOING);
  return (
    <li key={id}>
      <span>{text}</span>
      {Number(category) !== Categories.DOING && (
        <button name={Categories.DOING + ''} onClick={onClick}>
          Doing
        </button>
      )}
      {Number(category) !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ''} onClick={onClick}>
          To Do
        </button>
      )}
      {Number(category) !== Categories.DONE && (
        <button name={Categories.DONE + ''} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
