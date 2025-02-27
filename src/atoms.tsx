import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export enum Categories {
  'TO_DO',
  'DOING',
  'DONE',
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

const { persistAtom } = recoilPersist({
  key: 'toDoLocal',
  storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const categoriesState = atom({
  key: 'categories',
  default: ['TO_DO', 'DOING', 'DONE'],
});
