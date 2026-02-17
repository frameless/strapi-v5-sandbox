import { Combobox, ComboboxOption, Field, TextInput } from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import usePluginConfig from '../../hooks/use-plugin-config';
import { getTranslation } from '../../utils/getTranslation';

type FloLegalDataParams = {
  identifier: string;
  name?: string;
};

export interface FloLegalFieldInputProps {
  attribute: {
    type: string;
  };
  disabled: boolean;
  error?: string;
  hint?: string;
  label: string;
  placeholder?: string;
  name: string;
  required: boolean;
  value: string | null;
  type: string;

  onChange: (event: unknown) => void;
  onBlur: () => void;
  onFocus: () => void;
}

export const FloLegalField = ({
  value,
  onChange,
  name,
  required,
  type,
  placeholder,
  disabled,
  error,
  label,
  hint,
}: FloLegalFieldInputProps) => {
  const { config, isLoading } = usePluginConfig();
  const [checks, setChecks] = useState<FloLegalDataParams[]>([]);

  const { formatMessage } = useIntl();
  const apiUrl = config?.api_url?.endsWith('/') ? `${config.api_url}checks` : `${config?.api_url}/checks`;

  useEffect(() => {
    if (!config?.api_url || !config?.token) return;

    const fetchChecks = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${config.token}`,
          },
        });

        const data = await response.json();
        setChecks(data?.checks || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChecks();
  }, [config, apiUrl]);

  const generateFloLegalData = (params: FloLegalDataParams) => new URLSearchParams({ ...params }).toString();

  if (!config?.api_url || !config?.token) {
    return (
      <Field.Root
        name={name}
        error={error}
        hint={formatMessage({
          id: getTranslation('flo-legal-embed.disabled.hint'),
          defaultMessage: 'Ensure FLO_LEGAL_API_URL and FLO_LEGAL_API_TOKEN are configured to enable this field.',
        })}
      >
        <Field.Label>{label}</Field.Label>

        <TextInput
          name={name}
          value=""
          placeholder={formatMessage({
            id: getTranslation('flo-legal-embed.disabled.placeholder'),
            defaultMessage: 'This field is disabled until necessary settings are configured.',
          })}
          disabled
        />

        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  }

  return (
    <Field.Root name={name} error={error} hint={hint} required={required}>
      <Field.Label>{label}</Field.Label>

      <Combobox
        placeholder={placeholder}
        aria-label={label}
        disabled={disabled}
        required={required}
        value={value ?? ''}
        loading={isLoading}
        onChange={(val: string) => onChange({ target: { name, value: val, type } })}
      >
        {checks.map(({ identifier, name }) => (
          <ComboboxOption key={identifier} value={generateFloLegalData({ identifier })}>
            {name}
          </ComboboxOption>
        ))}
      </Combobox>

      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
};
