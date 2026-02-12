import { MdTableChart, MdDelete, MdAdd, MdTableRows, MdEditNote, MdHighlightOff, MdViewColumn } from 'react-icons/md';

export interface TableAction {
  label: string;
  command: string;
  icon: React.ReactNode;
  destructive?: boolean;
}

export interface ActionGroup {
  label: string;
  icon: React.ReactNode;
  actions: TableAction[];
}

export const actionGroups: ActionGroup[] = [
  {
    label: 'Table',
    icon: <MdTableChart />,
    actions: [
      {
        label: 'Insert Table',
        command: 'insertTable',
        icon: <MdTableChart />,
      },
      {
        label: 'Insert with Caption',
        command: 'insertTableFigure',
        icon: <MdTableChart />,
      },
      {
        label: 'Delete Table',
        command: 'deleteTable',
        icon: <MdDelete />,
        destructive: true,
      },
      {
        label: 'Delete Table & Caption',
        command: 'deleteTableFigure',
        icon: <MdDelete />,
        destructive: true,
      },
    ],
  },
  {
    label: 'Rows',
    icon: <MdTableRows />,
    actions: [
      { label: 'Add Row Before', command: 'addRowBefore', icon: <MdAdd /> },
      { label: 'Add Row After', command: 'addRowAfter', icon: <MdAdd /> },
      { label: 'Delete Row', command: 'deleteRow', icon: <MdDelete />, destructive: true },
    ],
  },
  {
    label: 'Columns',
    icon: <MdViewColumn />,
    actions: [
      { label: 'Add Column Before', command: 'addColumnBefore', icon: <MdAdd /> },
      { label: 'Add Column After', command: 'addColumnAfter', icon: <MdAdd /> },
      {
        label: 'Delete Column',
        command: 'deleteColumn',
        icon: <MdDelete />,
        destructive: true,
      },
    ],
  },
  {
    label: 'Headers',
    icon: <MdTableRows />,
    actions: [{ label: 'Toggle Row Header', command: 'toggleHeaderRow', icon: <MdTableRows /> }],
  },
  {
    label: 'Captions',
    icon: <MdEditNote />,
    actions: [
      {
        label: 'Add/Update Caption',
        command: 'updateTableWithCaption',
        icon: <MdEditNote />,
      },
      {
        label: 'Remove Caption',
        command: 'removeTableCaption',
        icon: <MdHighlightOff />,
        destructive: true,
      },
    ],
  },
];
