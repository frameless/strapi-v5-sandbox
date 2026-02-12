import { Box, Field, Typography, Toggle } from '@strapi/design-system';
import React from 'react';

import { addRemoveFromList } from '../../../../../utils/helpers';
import { GridLayout } from '../../../components/ui/GridLayout';

import { EditorOptions, HandleChangeEventType } from './Embeds';

interface TextProps {
  values: EditorOptions;
  handleChange: (param: HandleChangeEventType) => void;
}

const Text: React.FC<TextProps> = ({ values, handleChange }) => {
  return (
    <>
      <Box marginBottom="1rem">
        <Typography variant="beta" tag="h2">
          Heading
        </Typography>
      </Box>

      <GridLayout size="M">
        <Box>
          <Field.Root id="headings">
            <Field.Label>Heading 1</Field.Label>
            <Toggle
              name="headings"
              onLabel="Enabled"
              offLabel="Disabled"
              checked={values.headings.includes('h1')}
              onChange={() =>
                handleChange({
                  target: {
                    name: 'headings',
                    value: addRemoveFromList([...values.headings], 'h1'),
                  },
                })
              }
            />
          </Field.Root>
        </Box>
        <Field.Root id="heading-2">
          <Field.Label>Heading 2</Field.Label>
          <Toggle
            name="headings"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.headings.includes('h2')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'headings',
                  value: addRemoveFromList([...values.headings], 'h2'),
                },
              })
            }
          />
        </Field.Root>
        <Field.Root id="headings">
          <Field.Label>Heading 3</Field.Label>
          <Toggle
            name="headings"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.headings.includes('h3')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'headings',
                  value: addRemoveFromList([...values.headings], 'h3'),
                },
              })
            }
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Heading 4</Field.Label>
          <Toggle
            name="headings"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.headings.includes('h4')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'headings',
                  value: addRemoveFromList([...values.headings], 'h4'),
                },
              })
            }
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Heading 5</Field.Label>
          <Toggle
            name="headings"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.headings.includes('h5')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'headings',
                  value: addRemoveFromList([...values.headings], 'h5'),
                },
              })
            }
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Heading 6</Field.Label>
          <Toggle
            name="headings"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.headings.includes('h6')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'headings',
                  value: addRemoveFromList([...values.headings], 'h6'),
                },
              })
            }
          />
        </Field.Root>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Text styles</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root>
          <Field.Label>Bold</Field.Label>
          <Toggle
            name="bold"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.bold}
            onChange={() => handleChange({ target: { name: 'bold', value: !values.bold } })}
          />
        </Field.Root>
        <Field.Root id="italic">
          <Field.Label>Italic</Field.Label>
          <Toggle
            name="italic"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.italic}
            onChange={() => handleChange({ target: { name: 'italic', value: !values.italic } })}
          />
        </Field.Root>
        <Field.Root id="strikethrough">
          <Field.Label>Strikethrough</Field.Label>
          <Toggle
            name="strikethrough"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.strikethrough}
            onChange={() => handleChange({ target: { name: 'strikethrough', value: !values.strikethrough } })}
          />
        </Field.Root>
        <Field.Root id="underline">
          <Field.Label>Underline</Field.Label>
          <Toggle
            name="underline"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.underline}
            onChange={() => handleChange({ target: { name: 'underline', value: !values.underline } })}
          />
        </Field.Root>
        <Field.Root id="code">
          <Field.Label>Code</Field.Label>
          <Toggle
            name="code"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.code}
            onChange={() => handleChange({ target: { name: 'code', value: !values.code } })}
          />
        </Field.Root>
        <Field.Root id="blockquote">
          <Field.Label>Blockquote</Field.Label>
          <Toggle
            name="blockquote"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.blockquote}
            onChange={() => handleChange({ target: { name: 'blockquote', value: !values.blockquote } })}
          />
        </Field.Root>
        <Field.Root id="highlight">
          <Field.Label>Highlight</Field.Label>
          <Toggle
            name="highlight"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.highlight}
            onChange={() => handleChange({ target: { name: 'highlight', value: !values.highlight } })}
          />
        </Field.Root>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Text alignment</Typography>
      </Box>
      <GridLayout size="M">
        <Field.Root id="left">
          <Field.Label>Left</Field.Label>
          <Toggle
            name="align"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.align.includes('left')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'align',
                  value: addRemoveFromList([...values.align], 'left'),
                },
              })
            }
          />
        </Field.Root>
        <Field.Root id="center">
          <Field.Label>Center</Field.Label>
          <Toggle
            name="align"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.align.includes('center')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'align',
                  value: addRemoveFromList([...values.align], 'center'),
                },
              })
            }
          />
        </Field.Root>
        <Field.Root id="right">
          <Field.Label>Right</Field.Label>
          <Toggle
            name="align"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.align.includes('right')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'align',
                  value: addRemoveFromList([...values.align], 'right'),
                },
              })
            }
          />
        </Field.Root>
        <Box />
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Lists</Typography>
      </Box>
      <GridLayout size="M">
        <Field.Root id="ordered-list">
          <Field.Label>Ordered list</Field.Label>
          <Toggle
            name="lists"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.lists.includes('ol')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'lists',
                  value: addRemoveFromList([...values.lists], 'ol'),
                },
              })
            }
          />
        </Field.Root>

        <Field.Root id="unordered-list">
          <Field.Label></Field.Label>
          <Toggle
            name="unordered-list"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.lists.includes('ul')}
            onChange={() =>
              handleChange({
                target: {
                  name: 'lists',
                  value: addRemoveFromList([...values.lists], 'ul'),
                },
              })
            }
          />
        </Field.Root>

        <Field.Root
          id="disableOrderedListShorthand"
          hint="Normally you can type: 1. and after the space it converts it to a ordered list. This can be annoying when typing dates."
        >
          <Field.Label>Disable shorthand for ordered list</Field.Label>
          <Toggle
            name="lists"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.disableOrderedListShorthand}
            onChange={() =>
              handleChange({
                target: {
                  name: 'disableOrderedListShorthand',
                  value: !values.disableOrderedListShorthand,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>
    </>
  );
};

export default Text;
