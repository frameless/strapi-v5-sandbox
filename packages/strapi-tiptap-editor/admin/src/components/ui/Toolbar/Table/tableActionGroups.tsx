import {
  MdTableChart,
  MdDelete,
  MdAdd,
  MdTableRows,
  MdEditNote,
  MdHighlightOff,
  MdViewColumn,
  MdMergeType,
  MdCallSplit,
  MdSwapCalls,
} from 'react-icons/md';

export interface TableAction {
  label: string;
  labelId: string;
  command: string;
  icon: React.ReactNode;
  destructive?: boolean;
}

export interface ActionGroup {
  labelId: string;
  label: string;
  icon: React.ReactNode;
  actions: TableAction[];
}

export const actionGroups: ActionGroup[] = [
  {
    label: 'Table',
    labelId: 'table.group.table',
    icon: <MdTableChart />,
    actions: [
      {
        label: 'Insert Table',
        command: 'insertTable',
        icon: <MdTableChart />,
        labelId: 'tableActionGroup.insert.table',
      },
      {
        label: 'Insert with Caption',
        command: 'insertTableFigure',
        icon: <MdTableChart />,
        labelId: 'tableActionGroup.insert.table.with.caption',
      },
      {
        label: 'Delete Table',
        command: 'deleteTable',
        icon: <MdDelete />,
        destructive: true,
        labelId: 'tableActionGroup.delete.table',
      },
      {
        label: 'Delete Table & Caption',
        command: 'deleteTableFigure',
        icon: <MdDelete />,
        destructive: true,
        labelId: 'tableActionGroup.delete.table.with.caption',
      },
    ],
  },
  {
    label: 'Rows',
    icon: <MdTableRows />,
    labelId: 'table.group.rows',
    actions: [
      {
        label: 'Insert row above',
        command: 'addRowBefore',
        icon: <MdAdd />,
        labelId: 'tableActionGroup.insert.row.above',
      },
      {
        label: 'Insert row below',
        command: 'addRowAfter',
        icon: <MdAdd />,
        labelId: 'tableActionGroup.insert.row.below',
      },
      {
        label: 'Delete Row',
        command: 'deleteRow',
        icon: <MdDelete />,
        destructive: true,
        labelId: 'tableActionGroup.delete.row',
      },
    ],
  },
  {
    label: 'Columns',
    icon: <MdViewColumn />,
    labelId: 'table.group.columns',
    actions: [
      {
        label: 'Insert column before',
        command: 'addColumnBefore',
        icon: <MdAdd />,
        labelId: 'tableActionGroup.add.column.before',
      },
      {
        label: 'Insert column after',
        command: 'addColumnAfter',
        icon: <MdAdd />,
        labelId: 'tableActionGroup.add.column.after',
      },
      {
        label: 'Delete Column',
        command: 'deleteColumn',
        icon: <MdDelete />,
        destructive: true,
        labelId: 'tableActionGroup.delete.column',
      },
    ],
  },
  {
    label: 'Headers',
    labelId: 'table.group.headers',
    icon: <MdTableRows />,
    actions: [
      {
        label: 'Toggle Row Header',
        command: 'toggleHeaderRow',
        icon: <MdTableRows />,
        labelId: 'tableActionGroup.toggle.row.header',
      },
    ],
  },
  {
    label: 'Captions',
    icon: <MdEditNote />,
    labelId: 'table.group.captions',
    actions: [
      {
        label: 'Add/Update Caption',
        command: 'updateTableWithCaption',
        icon: <MdEditNote />,
        labelId: 'tableActionGroup.add.update.caption',
      },
      {
        label: 'Remove Caption',
        command: 'removeTableCaption',
        icon: <MdHighlightOff />,
        destructive: true,
        labelId: 'tableActionGroup.remove.caption',
      },
    ],
  },
  {
    label: 'Cells',
    icon: <MdTableChart />,
    labelId: 'table.group.cells',
    actions: [
      {
        label: 'Merge Cells',
        command: 'mergeCells',
        icon: <MdMergeType />,
        labelId: 'tableActionGroup.merge.cells',
      },
      {
        label: 'Split Cell',
        command: 'splitCell',
        icon: <MdCallSplit />,
        labelId: 'tableActionGroup.split.cell',
      },
      {
        label: 'Merge or Split Cell',
        command: 'mergeOrSplit',
        icon: <MdSwapCalls />,
        destructive: true,
        labelId: 'tableActionGroup.merge.or.split',
      },
    ],
  },
];
