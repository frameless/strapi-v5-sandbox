import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import type { Editor as EditorTypes } from '@tiptap/react';

interface LanguagesListProps {
  editor: EditorTypes;
  languages: { name?: string; code: string }[];
  disabled?: boolean;
  selectField: {
    placeholder?: string;
    removeLanguageOption: string;
  };
}

export const LanguagesList = ({ editor, languages, selectField, disabled }: LanguagesListProps) => (
  <SingleSelect
    disabled={disabled}
    size="S"
    placeholder={selectField?.placeholder}
    value={editor.isActive('language') ? editor.getAttributes('language').lang : ''}
    onChange={(event: string | number) => {
      if (editor) {
        if (event === 'remove_language') {
          editor.chain().focus().unsetLanguage().run();
          return;
        }
        editor
          .chain()
          .focus()
          .toggleLanguage({ lang: event as string })
          .run();
      }
    }}
  >
    <SingleSelectOption value="remove_language">{selectField.removeLanguageOption}</SingleSelectOption>
    {languages &&
      languages.length > 0 &&
      languages.map(({ code, name }) => (
        <SingleSelectOption key={code} className="icon" value={code}>
          {name}
        </SingleSelectOption>
      ))}
  </SingleSelect>
);
