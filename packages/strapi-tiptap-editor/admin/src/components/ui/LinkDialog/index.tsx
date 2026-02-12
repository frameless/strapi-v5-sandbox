import { Button, Modal, TextInput, Flex, Field } from '@strapi/design-system';
import React from 'react';

type TextInputProps = {
  label: string;
  placeholder: string;
  name: string;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  ariaLabel: string;
  hint?: string;
  error?: string;
};

type StartActionButtonProps = {
  onClick: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

type EndActionButtonProps = {
  onClick: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  disabled?: boolean;
};

export interface LinkDialogProps {
  onDialogClose: (_event: React.KeyboardEvent<HTMLElement>) => void;
  isDialogOpen: boolean;
  dialogTitle: string;
  textInputProps: TextInputProps;
  startActionButtonProps: StartActionButtonProps;
  endActionButtonProps: EndActionButtonProps;
}

export const LinkDialog = ({
  onDialogClose,
  isDialogOpen,
  dialogTitle,
  textInputProps,
  startActionButtonProps,
  endActionButtonProps,
}: LinkDialogProps) => {
  return (
    <Modal.Root
      open={isDialogOpen}
      onOpenChange={(open) => !open && onDialogClose({} as React.KeyboardEvent<HTMLElement>)}
    >
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{dialogTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field.Root
            name={textInputProps.name}
            error={textInputProps?.error}
            hint={textInputProps?.hint}
            id={textInputProps.name}
          >
            <Flex direction="column" alignItems="stretch" gap={1}>
              <Field.Label>{textInputProps.label}</Field.Label>
              <TextInput
                onChange={textInputProps.onChange}
                value={textInputProps.value}
                placeholder={textInputProps.placeholder}
                aria-label={textInputProps.ariaLabel}
                name={textInputProps.name}
              />
              <Field.Hint />
              <Field.Error />
            </Flex>
          </Field.Root>
        </Modal.Body>
        <Modal.Footer>
          <Flex gap={2}>
            <Button onClick={startActionButtonProps.onClick} variant="tertiary">
              {startActionButtonProps.text}
            </Button>
            <Button disabled={endActionButtonProps?.disabled} onClick={endActionButtonProps.onClick} variant="default">
              {endActionButtonProps.text}
            </Button>
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};
