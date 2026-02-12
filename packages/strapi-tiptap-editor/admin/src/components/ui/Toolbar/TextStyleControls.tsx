import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import type { Editor } from '@tiptap/core';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { getTranslation } from '../../../utils';

const textStyles = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Lead Paragraph', value: 'lead' },
  { label: 'Heading 1', value: 'heading-1' },
  { label: 'Heading 2', value: 'heading-2' },
  { label: 'Heading 3', value: 'heading-3' },
  { label: 'Heading 4', value: 'heading-4' },
  { label: 'Heading 5', value: 'heading-5' },
  { label: 'Heading 6', value: 'heading-6' },
];

export const TextStyleControls = ({ editor, disabled }: { editor: Editor; disabled?: boolean }) => {
  const [selectedStyle, setSelectedStyle] = useState<string | number | null>('paragraph');
  const { formatMessage } = useIntl();
  // Detect active style on selection change
  const updateActiveStyle = () => {
    if (!editor) return;

    let activeStyle: string = 'paragraph';

    // Check for headings first
    if (editor.isActive('heading', { level: 1 })) {
      activeStyle = 'heading-1';
    } else if (editor.isActive('heading', { level: 2 })) {
      activeStyle = 'heading-2';
    } else if (editor.isActive('heading', { level: 3 })) {
      activeStyle = 'heading-3';
    } else if (editor.isActive('heading', { level: 4 })) {
      activeStyle = 'heading-4';
    } else if (editor.isActive('heading', { level: 5 })) {
      activeStyle = 'heading-5';
    } else if (editor.isActive('heading', { level: 6 })) {
      activeStyle = 'heading-6';
    } else if (editor.isActive('leadParagraph')) {
      activeStyle = 'lead';
    } else if (editor.isActive('paragraph')) {
      activeStyle = 'paragraph';
    }

    setSelectedStyle(activeStyle);
  };

  useEffect(() => {
    if (!editor) return;

    // Update on mount
    updateActiveStyle();

    // Listen to editor updates
    const handleUpdate = () => {
      updateActiveStyle();
    };

    const handleSelectionUpdate = () => {
      updateActiveStyle();
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleSelectionUpdate);

    // eslint-disable-next-line consistent-return
    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor]);

  const handleTextStyleChange = (value: string | number | null) => {
    if (!editor || !value) return;

    setSelectedStyle(value);

    // Use a single chain for better performance
    const chain = editor.chain().focus();

    switch (value) {
      case 'heading-1':
        chain.setHeading({ level: 1 }).run();
        break;
      case 'heading-2':
        chain.setHeading({ level: 2 }).run();
        break;
      case 'heading-3':
        chain.setHeading({ level: 3 }).run();
        break;
      case 'heading-4':
        chain.setHeading({ level: 4 }).run();
        break;
      case 'heading-5':
        chain.setHeading({ level: 5 }).run();
        break;
      case 'heading-6':
        chain.setHeading({ level: 6 }).run();
        break;
      case 'lead':
        chain.setLeadParagraph().run();
        break;
      case 'paragraph':
      default:
        chain.setParagraph().run();
        break;
    }
  };

  return (
    <SingleSelect
      disabled={disabled}
      size="S"
      placeholder="Select style"
      value={selectedStyle}
      onChange={(value) => handleTextStyleChange(value)}
      clearLabel="Clear"
    >
      {textStyles.map((style) => (
        <SingleSelectOption key={style.value} value={style.value}>
          {formatMessage({
            id: getTranslation(`components.toolbar.text.${style.value}`),
            defaultMessage: style.label,
          })}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};
