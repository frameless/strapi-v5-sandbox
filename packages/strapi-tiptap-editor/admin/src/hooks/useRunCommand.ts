import { Editor } from '@tiptap/core';
import { useCallback } from 'react';

interface UseRunCommandProps {
  editor: Editor;
  setOpen: (value: boolean) => void;
  setCurrentView: (view: 'main' | 'group') => void;
  setSelectedGroup: (group: any | null) => void;
}

export function useRunCommand({ editor, setOpen, setCurrentView, setSelectedGroup }: UseRunCommandProps) {
  const runCommand = useCallback(
    (cmd: string) => {
      if (!editor) return;

      editor.chain().focus();

      if (cmd === 'insertTableFigure') {
        editor.commands.insertTableFigure({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        });
      } else {
        const commandFn = (editor.commands as Record<string, any>)[cmd];
        if (typeof commandFn === 'function') {
          commandFn();
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Command not found: ${cmd}`);
        }
      }

      setOpen(false);
      setCurrentView('main');
      setSelectedGroup(null);
    },
    [editor, setOpen, setCurrentView, setSelectedGroup],
  );

  return runCommand;
}
