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

interface Target {
  name: string;
  value: string;
}

interface OnChangeParamTypes {
  target: Target;
}

interface EditorProps {
  editor: EditorTypes;
  settings: typeof defaultSettings;
  productPrice?: PriceListTypes | null;
  disabled?: boolean;
  name: string;

  onChange: (param: OnChangeParamTypes) => void;
  value: string;
}

const Editor = ({ editor, settings, productPrice }: EditorProps) => {
  // Media library handling
  const mediaLib = useMediaLib({ editor });
  const components = useStrapiApp('TipTapEditor', (state) => state.components);
  // Wait till we have the settings before showing the editor
  if (!settings) {
    return null;
  }

  const localStorageTheme = getLocalStorage('STRAPI_THEME', isValidTheme);
  return (
    <Box>
      <ToolbarWrapper>
        <Toolbar
          editor={editor}
          toggleMediaLib={mediaLib.open}
          settings={settings}
          productPrice={productPrice as any}
        />
      </ToolbarWrapper>

      <Document
        className={clsx('utrecht-document--surface', 'utrecht-theme--media-query-color-scheme', {
          'utrecht-theme--color-scheme-dark': localStorageTheme === 'dark',
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
