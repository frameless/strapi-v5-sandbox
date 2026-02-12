import { Alert, Box, Button, Field, Flex, Modal, TextInput, Typography } from '@strapi/design-system';
import type { Editor as EditorTypes } from '@tiptap/react';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { FaAnchor } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { RxUpdate } from 'react-icons/rx';
import { useIntl } from 'react-intl';
import slugify from 'slugify';

import { getTranslation } from '../../../utils';

import { ToolbarButton, ToolbarIconButtonGroup } from './ToolbarButton';

interface ToolbarItemHeadingWithIDProps {
  editor: EditorTypes;
  disabled?: boolean;
}
export const ToolbarItemHeadingWithID = ({ editor, disabled }: ToolbarItemHeadingWithIDProps) => {
  const [headingID, setHeadingID] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [updateHeadingID, setUpdateHeadingID] = useState<boolean>(false);
  const { formatMessage } = useIntl();

  if (!editor) return null;

  const { selection } = editor.state;
  const { $from } = selection;
  const node = $from.node($from.depth);
  const isHeadingActive = editor.isActive('heading');
  const currentHeadingID = editor.getAttributes('heading')?.id;
  const headingLevel = editor.getAttributes('heading')?.level;

  const addIdToSelectedHeading = async (id: string) => {
    if (node.type.name === 'heading') {
      if (node.attrs.id !== id) {
        const transaction = editor.state.tr.setNodeMarkup($from.before(), undefined, {
          ...node.attrs,
          id,
        });
        editor.view.dispatch(transaction);
      }
    }
  };
  const createAnchorLink = (text: string) => {
    return slugify(text, {
      replacement: '-',
      lower: true,
      strict: true,
      locale: 'nl',
      trim: true,
    });
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Error copying to clipboard: ${error}`);
    }
  };
  const onHeadingClickHandler = ({ id, dialogVisibility }: { id: string; dialogVisibility: boolean }) => {
    addIdToSelectedHeading(id).then(() => {
      if (!id) return;

      setHeadingID(id);
      setIsVisible(dialogVisibility);
      copyToClipboard(`#${id}`);
    });
  };

  const generatedID = createAnchorLink(node.textContent);
  const isHeadingID = headingID.trim().length === 0;

  const updateTextFormatMessage = formatMessage({
    id: getTranslation('common.action.update'),
    defaultMessage: 'Update',
  });
  const generateFormatMessage = formatMessage({
    id: getTranslation('common.action.generate'),
    defaultMessage: 'Generate',
  });
  const headingTextFormatMessage = formatMessage({
    id: getTranslation('common.action.heading'),
    defaultMessage: 'Heading',
  });
  const closeTextFormatMessage = formatMessage({
    id: getTranslation('common.action.close'),
    defaultMessage: 'Close',
  });
  const dialogTitleFormatMessage = formatMessage(
    {
      id: getTranslation('components.toolbar.headingWithID.dialog.title'),
      defaultMessage: `${
        updateHeadingID ? updateTextFormatMessage : generateFormatMessage
      } ${headingTextFormatMessage} ID`,
    },
    {
      heading: headingTextFormatMessage,
      state: updateHeadingID ? updateTextFormatMessage : generateFormatMessage,
    },
  );
  const alertTitleFormatMessage = formatMessage(
    {
      id: updateHeadingID
        ? getTranslation('components.toolbar.headingWithID.alert.title.update')
        : getTranslation('components.toolbar.headingWithID.alert.title.generate'),
      defaultMessage: 'The Heading ID generated successfully!',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const alertDescriptionFormatMessage = formatMessage({
    id: getTranslation('components.toolbar.headingWithID.alert.description'),
    defaultMessage: 'ID copied to clipboard:',
  });
  const inputLabelFormatMessage = formatMessage(
    {
      id: getTranslation('components.toolbar.headingWithID.input.label'),
      defaultMessage: 'Heading ID',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const inputPlaceholderFormatMessage = formatMessage(
    {
      id: getTranslation('components.toolbar.headingWithID.input.placeholder'),
      defaultMessage: 'Enter a unique ID',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const inputHintFormatMessage = formatMessage(
    {
      id: getTranslation('components.toolbar.headingWithID.input.hint'),
      defaultMessage: 'The ID will be used to create a link to this heading',
    },
    {
      heading: headingTextFormatMessage,
    },
  );
  const inputErrorFormatMessage = formatMessage({
    id: getTranslation('components.toolbar.headingWithID.input.error'),
    defaultMessage: 'This field is required',
  });
  const iconButtonGenerateLabelFormatMessage = formatMessage(
    {
      id: getTranslation('components.toolbar.headingWithID.iconButton.generate.label'),
      defaultMessage: `Generate ID for heading-${headingLevel} and copy`,
    },
    {
      headingLevel,
    },
  );
  const iconButtonEditLabelFormatMessage = formatMessage(
    {
      id: getTranslation('components.toolbar.headingWithID.iconButton.edit.label'),
      defaultMessage: `Edit heading-${headingLevel} and copy`,
    },
    {
      headingLevel,
    },
  );
  return (
    <>
      <Modal.Root open={isVisible} onOpenChange={(open) => !open && setIsVisible(false)}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>{dialogTitleFormatMessage}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isAlertVisible && (
              <Alert
                closeLabel="Close"
                title={alertTitleFormatMessage}
                variant="success"
                onClose={() => {
                  setIsVisible(false);
                  setUpdateHeadingID(false);
                  setIsAlertVisible(false);
                }}
              >
                <Box marginTop={2}>
                  <Typography variant="epsilon">{alertDescriptionFormatMessage}</Typography>
                </Box>
                <Box marginTop={1}>
                  <Typography variant="pi">#{currentHeadingID}</Typography>
                </Box>
              </Alert>
            )}
            {updateHeadingID && (
              <Flex direction="column" alignItems="center" gap={2} marginTop={5} justifyContent="center">
                <Field.Root
                  name="heading-id"
                  id="update-heading-id"
                  error={isHeadingID && inputErrorFormatMessage}
                  hint={inputHintFormatMessage}
                >
                  <Field.Label>{inputLabelFormatMessage}</Field.Label>
                  <TextInput
                    placeholder={inputPlaceholderFormatMessage}
                    defaultValue={currentHeadingID}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setHeadingID(event.target.value)}
                    value={headingID}
                  />
                  <Field.Hint />
                  <Field.Error />
                </Field.Root>
              </Flex>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Flex gap={2}>
              <Button
                disabled={disabled}
                onClick={() => {
                  setIsVisible(false);
                  setUpdateHeadingID(false);
                  setIsAlertVisible(false);
                }}
                variant="tertiary"
                startIcon={<GrClose />}
              >
                {closeTextFormatMessage}
              </Button>
              <Button
                disabled={isHeadingID}
                onClick={() => {
                  setUpdateHeadingID(true);
                  setIsAlertVisible(false);
                  if (updateHeadingID) {
                    onHeadingClickHandler({ id: headingID, dialogVisibility: true });
                    setIsAlertVisible(true);
                  }
                }}
                variant="default"
                startIcon={<RxUpdate />}
              >
                {updateTextFormatMessage}
              </Button>
            </Flex>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
      <ToolbarIconButtonGroup>
        <ToolbarButton
          active={!!currentHeadingID}
          label={currentHeadingID ? iconButtonEditLabelFormatMessage : iconButtonGenerateLabelFormatMessage}
          disabled={!isHeadingActive}
          onClick={() => {
            if (currentHeadingID) {
              onHeadingClickHandler({ id: currentHeadingID, dialogVisibility: true });
              setUpdateHeadingID(true);
            } else {
              onHeadingClickHandler({ id: generatedID, dialogVisibility: true });
              setIsAlertVisible(true);
            }
          }}
        >
          <FaAnchor />
        </ToolbarButton>
      </ToolbarIconButtonGroup>
    </>
  );
};
