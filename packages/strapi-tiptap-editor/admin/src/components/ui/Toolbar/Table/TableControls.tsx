import { useState, useEffect, useCallback } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { Box, Typography, Button, Flex } from '@strapi/design-system';
import { MdArrowBack, MdOutlineTableChart } from 'react-icons/md';
import type { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';

import { useKeyboardNavigation } from '../../../../hooks/useKeyboardNavigation';
import { useRunCommand } from '../../../../hooks/useRunCommand';
import { getTranslation } from '../../../../utils';

import { TableControlsGrid } from './TableControlsGrid';
import { TableActionButton } from './TableActionButton';
import { TableActionIcon } from './TableActionIcon';
import { TableActionLabel } from './TableActionLabel';
import { TableActionFooter } from './TableActionFooter';
import { TableActionFooterText } from './TableActionFooterText';
import { GoBackButton } from './GoBackButton';
import { ActionGroup, actionGroups } from './tableActionGroups';

type ViewMode = 'main' | 'group';

export const TableControls = ({ editor, disabled }: { editor: Editor; disabled?: boolean }) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const [selectedGroup, setSelectedGroup] = useState<ActionGroup | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift()],
    placement: 'bottom-start',
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const runCommand = useRunCommand({
    editor,
    setOpen,
    setCurrentView,
    setSelectedGroup,
  });
  const openGroup = useCallback((group: ActionGroup) => {
    setSelectedGroup(group);
    setCurrentView('group');
    setFocusedIndex(0);
  }, []);
  const goBack = useCallback(() => {
    setCurrentView('main');
    setSelectedGroup(null);
    setFocusedIndex(0);
  }, []);
  const getCurrentItems = useCallback(() => {
    return currentView === 'main' ? actionGroups : selectedGroup?.actions || [];
  }, [currentView, selectedGroup]);

  useKeyboardNavigation({
    open,
    focusedIndex,
    setFocusedIndex,
    currentView,
    setOpen,
    getCurrentItems,
    openGroup,
    goBack,
    runCommand,
  });

  // Reset focus when opening/closing or changing views
  useEffect(() => {
    if (open) {
      setFocusedIndex(0);
    } else {
      setCurrentView('main');
      setSelectedGroup(null);
    }
  }, [open]);

  if (!editor) return null;

  const renderMainView = () => (
    <>
      <Box marginBottom={2}>
        <Typography variant="pi" fontWeight="bold" color="neutral600">
          {formatMessage({ id: getTranslation('table.toolbar.title'), defaultMessage: 'Table Actions' })}
        </Typography>
      </Box>

      <TableControlsGrid>
        {actionGroups.map((group, index) => (
          <TableActionButton
            flexDirection="column"
            focusedIndex={focusedIndex}
            index={index}
            key={group.label}
            padding={3}
            borderRadius="md"
            onClick={() => openGroup(group)}
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(-1)}
          >
            <TableActionIcon>{group.icon}</TableActionIcon>
            <TableActionLabel variant="pi" focusedIndex={focusedIndex} index={index}>
              {formatMessage({ id: getTranslation(group.labelId), defaultMessage: group.label })}
            </TableActionLabel>
          </TableActionButton>
        ))}
      </TableControlsGrid>

      <TableActionFooter>
        <TableActionFooterText variant="pi">
          {formatMessage({
            id: getTranslation('table.toolbar.footer'),
            defaultMessage: 'Use ↑↓ to navigate, Enter to select, Esc to close',
          })}
        </TableActionFooterText>
      </TableActionFooter>
    </>
  );

  const renderGroupView = () => (
    <>
      <Flex
        display="flex"
        marginBottom={2}
        alignItems={{
          initial: 'center',
        }}
      >
        <GoBackButton variant="ghost" size="S" onClick={goBack}>
          <MdArrowBack />
        </GoBackButton>
        <TableActionLabel variant="pi" fontWeight="bold" color="neutral600">
          {formatMessage({ id: getTranslation(selectedGroup?.labelId ?? ''), defaultMessage: selectedGroup?.label })}
        </TableActionLabel>
      </Flex>

      <Box>
        {selectedGroup?.actions.map((action, index) => (
          <TableActionButton
            index={index}
            focusedIndex={focusedIndex}
            flexDirection="row"
            justifyContent="start"
            key={action.command}
            padding={2}
            marginBottom={1}
            borderRadius="sm"
            onClick={() => runCommand(action.command)}
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(-1)}
          >
            <Box display="flex" style={{ alignItems: 'center' }}>
              {action.icon && (
                <TableActionIcon display="flex" marginRight={2}>
                  {action.icon}
                </TableActionIcon>
              )}
              <TableActionLabel index={index} focusedIndex={focusedIndex} variant="pi">
                {formatMessage({ id: getTranslation(action.labelId), defaultMessage: action.label })}
              </TableActionLabel>
            </Box>
          </TableActionButton>
        ))}
      </Box>
      <TableActionFooter>
        <TableActionFooterText variant="pi">
          {formatMessage({
            id: 'table.toolbar.footer.back',
            defaultMessage: 'Use ↑↓ to navigate, Enter to select, ← or Esc to go back',
          })}
        </TableActionFooterText>
      </TableActionFooter>
    </>
  );

  return (
    <>
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              disabled={disabled}
              ref={refs.setReference}
              variant={open ? 'secondary' : 'tertiary'}
              {...getReferenceProps()}
            >
              <Flex
                display="flex"
                alignItems={{
                  initial: 'center',
                }}
                gap={{
                  initial: 2,
                }}
              >
                <TableActionIcon display="flex">
                  <MdOutlineTableChart />
                </TableActionIcon>
                <TableActionLabel variant="pi" fontWeight="regular">
                  {formatMessage({ id: getTranslation('table.toolbar.button'), defaultMessage: 'Table Actions' })}
                </TableActionLabel>
              </Flex>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography variant="pi" color="neutral0">
              {formatMessage({
                id: getTranslation('table.toolbar.tooltip'),
                defaultMessage: 'Table editing tools and actions',
              })}
            </Typography>
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {open && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              animation: 'slideIn 0.2s ease',
              minWidth: currentView === 'main' ? '280px' : '250px',
              maxWidth: '320px',
              zIndex: 9999,
            }}
            background="neutral0"
            shadow="popupShadow"
            padding={3}
            borderRadius="md"
            {...getFloatingProps()}
          >
            {currentView === 'main' ? renderMainView() : renderGroupView()}
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};
