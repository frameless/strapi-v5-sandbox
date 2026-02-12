import { LanguagesType } from '../types';

export const sortLanguagesAlphabetically = (languages: LanguagesType[]) => {
  return languages.sort((a, b) => {
    if (!a.name || !b.name) return 0;
    return a.name.localeCompare(b.name);
  });
};
