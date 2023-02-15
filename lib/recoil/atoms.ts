import { atom } from "recoil";

const largeCategoryState = atom<string[]>({
  key: "largeCategoryState",
  default: [],
});

const subCategoryState = atom<string[]>({
  key: "subCategoryState",
  default: [],
});

export { largeCategoryState, subCategoryState };
