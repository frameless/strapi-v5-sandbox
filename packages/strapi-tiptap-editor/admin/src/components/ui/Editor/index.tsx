import { Box } from '@strapi/design-system';
import { EditorContent } from '@tiptap/react';
import type { Editor as EditorTypes } from '@tiptap/react';
import { Document } from '@utrecht/component-library-react';
import clsx from 'clsx';
import { useStrapiApp } from '@strapi/strapi/admin';

import defaultSettings from '../../../../../utils/defaults';
import { getLocalStorage } from '../../../utils';
import { PriceListTypes } from '../../../types';
import { ToolbarWrapper } from '../Toolbar/ToolbarWrapper';
import { MediaLib } from '../MediaLib';
import { useMediaLib } from '../../../hooks/useMediaLib';
import { Toolbar } from '../Toolbar';

import { EditorBox } from './EditorBox';

type Theme = 'light' | 'dark' | 'system';

const isValidTheme = (theme: Theme): theme is Theme => ['light', 'dark', 'system'].includes(theme);

interface EditorProps {
  editor: EditorTypes;
  settings: typeof defaultSettings;
  productPrice?: PriceListTypes;
  disabled?: boolean;
}

const Editor = ({ editor, settings, productPrice, disabled }: EditorProps) => {
  // Media library handling
  const mediaLib = useMediaLib({ editor });
  const components = useStrapiApp('TipTapEditor', (state) => state.components);
  const localStorageTheme = getLocalStorage('STRAPI_THEME', isValidTheme);
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode = localStorageTheme === 'dark' || (localStorageTheme === 'system' && prefersDark);
  return (
    <Box>
      <ToolbarWrapper>
        <Toolbar
          disabled={disabled}
          editor={editor}
          toggleMediaLib={mediaLib.open}
          settings={settings}
          productPrice={productPrice}
        />
      </ToolbarWrapper>

      <Document
        className={clsx('utrecht-document--surface', {
          'utrecht-theme--media-query-color-scheme': isDarkMode,
          'utrecht-theme--color-scheme-dark': isDarkMode,
        })}
      >
        <EditorBox>
          <EditorContent editor={editor} />
        </EditorBox>
      </Document>

      {settings.other && settings.other.wordcount ? (
        <Box marginTop="5px" color="neutral600">
          {(() => {
            const wordCount = editor.storage.characterCount.words();
            return `${wordCount} ${wordCount === 1 ? 'word' : 'words'}`;
          })()}
        </Box>
      ) : null}

      <MediaLib components={components} editor={editor} isOpen={mediaLib.isOpen} onClose={mediaLib.close} />
    </Box>
  );
};

export default Editor;
