import i18nLanguages from '@cospired/i18n-iso-languages';
import enI18Json from '@cospired/i18n-iso-languages/langs/en.json';
import nlI18Json from '@cospired/i18n-iso-languages/langs/nl.json';
import {
  Box,
  Button,
  Combobox,
  ComboboxOption,
  Modal,
  Flex,
  IconButton,
  Typography,
  Toggle,
  Field,
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import React, { useState } from 'react';

import { LanguagesType } from '../../../types';
import { localizeLanguagesNames } from '../../../utils/localizeLanguagesNames';
import { sortLanguagesAlphabetically } from '../../../utils/sortLanguagesAlphabetically';
import { useContentLocale } from '../../../hooks/useContentLocale';
import { GridLayout } from '../../../components/ui/GridLayout';

import { EditorOptions, HandleChangeEventType } from './Embeds';

i18nLanguages.registerLocale(enI18Json);
i18nLanguages.registerLocale(nlI18Json);

interface OtherProps {
  values: EditorOptions;

  handleChange: (param: HandleChangeEventType) => void;
}

const Other: React.FC<OtherProps> = ({ values, handleChange }) => {
  const locale = useContentLocale() ?? 'nl';

  const wordcount = values.other && values.other.wordcount;
  const [isVisible, setIsVisible] = useState(false);
  const [languages, setLanguages] = useState<LanguagesType[]>(values.other.language.default);
  const languagesArray = Object.keys(i18nLanguages.getNames(locale)).map((code) => ({
    code: code.toLocaleLowerCase(),
    name: i18nLanguages.getName(code, locale),
  }));

  const onLanguageChangeHandler = (value: string) => {
    if (!i18nLanguages.isValid(value) || languages.find(({ code }) => code === value)?.code) return;
    setLanguages(
      sortLanguagesAlphabetically([...languages, { name: i18nLanguages.getName(value, locale), code: value }]),
    );
  };

  return (
    <>
      <Box marginBottom="1rem">
        <Typography variant="beta">Other</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root hint="Show a word counter under the editor" id="other.wordcount">
          <Field.Label>Word count</Field.Label>
          <Toggle
            name="other.wordcount"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={wordcount}
            onChange={() =>
              handleChange({
                target: {
                  name: 'other.wordcount',
                  value: !wordcount,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>
      <GridLayout size="M">
        <Flex marginTop={5} gap={3}>
          <Field.Root hint="Apply language attributes to text" id="other.language.enabled">
            <Field.Label>Language</Field.Label>
            <Toggle
              name="other.language.enabled"
              onLabel="Enabled"
              offLabel="Disabled"
              checked={values.other.language.enabled}
              onChange={() =>
                handleChange({
                  target: {
                    name: 'other.language.enabled',
                    value: !values.other.language.enabled,
                  },
                })
              }
            />
            <Field.Error />
            <Field.Hint />
          </Field.Root>
          <Button onClick={() => setIsVisible(true)} variant="tertiary">
            Settings
          </Button>
          <Modal.Root open={isVisible} onOpenChange={(open) => !open && setIsVisible(false)}>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Language Settings</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field.Root id="select-language">
                  <Field.Label>Select a language</Field.Label>
                  <Combobox name="select-language" placeholder="Search a language" onChange={onLanguageChangeHandler}>
                    {localizeLanguagesNames(languagesArray).map(({ code, name }) => (
                      <ComboboxOption key={code} value={code}>
                        {name}
                      </ComboboxOption>
                    ))}
                  </Combobox>
                </Field.Root>
                {languages &&
                  languages.length > 0 &&
                  localizeLanguagesNames(languages).map(({ code, name }) => (
                    <Flex
                      justifyContent="space-between"
                      marginBottom={5}
                      marginTop={5}
                      marginRight={5}
                      marginLeft={5}
                      key={code}
                    >
                      {code && <Typography variant="delta">{i18nLanguages.getName(code, locale)}</Typography>}
                      <IconButton
                        label={`Delete the ${name} language`}
                        variant="secondary"
                        aria-label={`Delete the ${name} language`}
                        onClick={() => setLanguages(languages.filter((c) => c.code !== code))}
                      >
                        <Trash />
                      </IconButton>
                    </Flex>
                  ))}
              </Modal.Body>
              <Modal.Footer>
                <Flex gap={2}>
                  <Button onClick={() => setIsVisible(false)} variant="tertiary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleChange({
                        target: {
                          name: 'other.language.default',
                          value: languages,
                        },
                      });
                      setIsVisible(false);
                    }}
                    variant="secondary"
                  >
                    Save Language
                  </Button>
                </Flex>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Root>
        </Flex>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem" />
    </>
  );
};

export default Other;
