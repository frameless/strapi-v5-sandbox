import type { Editor } from '@tiptap/core';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { Button } from '@utrecht/component-library-react';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { TbArrowBack } from 'react-icons/tb';

import { cursorPositionHandler } from '../../../utils';

interface TableWidgetProps {
  editor: Editor;
  getPos: () => number;
}

export const TableWidget = ({ editor, getPos }: TableWidgetProps) => {
  const [isInsideFigure, setIsInsideFigure] = useState(false);

  useEffect(() => {
    // Check if this table is inside a tableFigure
    const pos = getPos();
    const $pos = editor.state.doc.resolve(pos);

    // Walk up the tree to see if we're inside a tableFigure
    for (let d = $pos.depth; d > 0; d--) {
      if ($pos.node(d).type.name === 'tableFigure') {
        setIsInsideFigure(true);
        return;
      }
    }

    setIsInsideFigure(false);
  }, [editor, getPos]);

  // Don't render the widget if we're inside a tableFigure
  // (the tableFigure will render its own widget)
  if (isInsideFigure) {
    return (
      <NodeViewWrapper as="div">
        <NodeViewContent />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="utrecht-table-widget">
      <Button
        appearance="primary-action-button"
        className={classnames('utrecht-table-widget__button', 'utrecht-table-widget__button--top')}
        onClick={() => cursorPositionHandler({ editor, position: 'above' })}
      >
        <TbArrowBack />
      </Button>
      <NodeViewContent />
      <Button
        appearance="primary-action-button"
        className={classnames('utrecht-table-widget__button', 'utrecht-table-widget__button--down')}
        onClick={() => cursorPositionHandler({ editor, position: 'below' })}
      >
        <TbArrowBack />
      </Button>
    </NodeViewWrapper>
  );
};
