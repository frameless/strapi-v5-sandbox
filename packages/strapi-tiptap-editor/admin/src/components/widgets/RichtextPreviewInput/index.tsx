import { Field, TextInput } from '@strapi/design-system';
import { useCallback, useEffect, useState } from 'react';

import { InputProps } from '../../../types';

export const RichtextPreviewInput = ({
  name,
  onChange,
  attribute,
  value,
  label,
  hint,
  placeholder,
  error,
  required,
}: InputProps) => {
  const [localValue, setLocalValue] = useState(value);

  const updateLabel = useCallback(
    (event: CustomEvent) => {
      if (!event.detail) return;
      const eventNameParts = event.detail.name?.split('.') || [];
      const nameParts = name?.split('.') || [];
      if (eventNameParts.length > 1 && nameParts.length > 1 && eventNameParts[1] === nameParts[1]) {
        setLocalValue(event.detail.label || '');
        onChange({
          target: {
            name,
            value: event.detail.label || '',
            type: attribute.type,
          },
        });
      }
    },
    [name, onChange, attribute.type],
  );

  useEffect(() => {
    window.addEventListener('labelUpdated', updateLabel as EventListener);

    return () => {
      window.removeEventListener('labelUpdated', updateLabel as EventListener);
    };
  }, [updateLabel]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Field.Root name={name} id={name} error={error} hint={hint} required={required}>
      <Field.Label>{label}</Field.Label>
      <TextInput
        name={name}
        value={localValue ?? ''}
        placeholder={placeholder}
        disabled={true}
        aria-describedby={hint ? `${name}-hint` : undefined}
        aria-invalid={!!error}
        aria-errormessage={error ? `${name}-error` : undefined}
      />
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
};
