import Table from '@tiptap/extension-table';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { TableWidget } from '../../../components/widgets/TableWidget';

const CustomTable = Table.extend({
  addNodeView() {
    return ReactNodeViewRenderer(TableWidget, {
      className: 'utrecht-node-viewer--table utrecht-node-viewer',
      // This will prevent the widget from rendering when table is inside tableFigure
      contentDOMElementTag: 'div',
    });
  },
});

export default CustomTable;
