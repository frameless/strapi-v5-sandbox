import { Box, Typography, TextInput, Toggle, Field } from '@strapi/design-system';
import { ChangeEvent } from 'react';

import { GridLayout } from '../../../components/ui/GridLayout';

export interface EditorOptions {
  headings: string[];
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  blockquote: boolean;
  highlight: boolean;
  align: string[];
  lists: string[];
  disableOrderedListShorthand: boolean;
  columns: any[];
  table: boolean;
  hardbreak: boolean;
  horizontal: boolean;
  links: {
    enabled: boolean;
    autolink: boolean;
    openOnClick: boolean;
    linkOnPaste: boolean;
    relAttribute: boolean;
    HTMLAttributes: {
      rel: string;
    };
  };
  image: {
    enabled: boolean;
    inline: boolean;
    allowBase64: boolean;
  };
  other: {
    wordcount: boolean;
    saveJson: boolean;
    language: {
      enabled: boolean;
      default: {
        name: string;
        code: string;
      }[];
    };
  };
  youtube: {
    enabled: boolean;
    height: number;
    width: number;
  };
}

export type HandleChangeEventType = {
  target: {
    name: string;
    value: any;
  };
};
interface EmbedsProps {
  values: EditorOptions;
  handleChange: (event: HandleChangeEventType) => void;
}

export const Embeds = ({ values, handleChange }: EmbedsProps) => {
  return (
    <>
      <Box marginBottom="1rem">
        <Typography variant="beta">Image</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="image" hint="Allow to add images to content">
          <Field.Label>Images</Field.Label>
          <Toggle
            name="image.enabled"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.image.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: 'image.enabled',
                  value: !values.image.enabled,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>

      <Box marginTop="1rem" marginBottom="1rem">
        <Typography variant="delta">Settings</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="image.inline" hint="Renders the image node inline">
          <Field.Label>Inline Image</Field.Label>
          <Toggle
            disabled={!values.image.enabled}
            name="image.inline"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.image.inline}
            onChange={() =>
              handleChange({
                target: {
                  name: 'image.inline',
                  value: !values.image.inline,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Field.Root hint="Allow images to be parsed as base64 strings" id="image.allowBase64">
          <Field.Label>Allow base64 images</Field.Label>
          <Toggle
            disabled={!values.image.enabled}
            name="image.allowBase64"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.image.allowBase64}
            onChange={() =>
              handleChange({
                target: {
                  name: 'image.allowBase64',
                  value: !values.image.allowBase64,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Links</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="links.enabled" hint="Allow to make text into links">
          <Field.Label>Enabled</Field.Label>
          <Toggle
            name="links.enabled"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.links.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: 'links.enabled',
                  value: !values.links.enabled,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>

      <Box marginTop="1rem" marginBottom="1rem">
        <Typography variant="delta">Settings</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="links.autolink" hint="If enabled, it adds links as you type.">
          <Field.Label>Auto link</Field.Label>
          <Toggle
            disabled={!values.links.enabled}
            name="links.autolink"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.links.autolink}
            onChange={() =>
              handleChange({
                target: {
                  name: 'links.autolink',
                  value: !values.links.autolink,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Field.Root id="links.openOnClick" hint="Open the link, when clicking it inside the editor">
          <Field.Label>Open on click</Field.Label>
          <Toggle
            disabled={!values.links.enabled}
            name="links.openOnClick"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.links.openOnClick}
            onChange={() =>
              handleChange({
                target: {
                  name: 'links.openOnClick',
                  value: !values.links.openOnClick,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Field.Root
          id="links.linkOnPaste"
          hint="Adds a link to the current selection if the pasted content only contains an url."
        >
          <Field.Label>Link on paste</Field.Label>
          <Toggle
            disabled={!values.links.enabled}
            name="links.linkOnPaste"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.links.linkOnPaste}
            onChange={() =>
              handleChange({
                target: {
                  name: 'links.linkOnPaste',
                  value: !values.links.linkOnPaste,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>

      <GridLayout size="M">
        <Field.Root id="rel">
          <Field.Label>Rel attribute value</Field.Label>
          <TextInput
            type="text"
            placeholder="Value of the rel attribute of links"
            name="rel"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange({
                target: {
                  name: 'links.HTMLAttributes.rel',
                  value: event.target.value,
                },
              })
            }
            value={values.links.HTMLAttributes.rel}
            aria-label="Value of the rel attribute of links"
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">YouTube</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="youtube.enabled" hint="Allow to add YouTube video embeds">
          <Field.Label>Enabled</Field.Label>
          <Toggle
            name="youtube.enabled"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.youtube.enabled}
            onChange={() =>
              handleChange({
                target: {
                  name: 'youtube.enabled',
                  value: !values.youtube.enabled,
                },
              })
            }
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Field.Root id="youtube.width">
          <Field.Label>Default video width</Field.Label>
          <TextInput
            type="number"
            placeholder="width of the embed"
            name="width"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange({
                target: {
                  name: 'youtube.width',
                  value: event.target.value,
                },
              })
            }
            value={values.youtube.width}
            aria-label="YouTube video width"
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Field.Root id="youtube.height">
          <Field.Label>Default video height</Field.Label>
          <TextInput
            type="number"
            placeholder="height of the embed"
            name="youtube.height"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange({
                target: {
                  name: 'youtube.height',
                  value: event.target.value,
                },
              })
            }
            value={values.youtube.height}
            aria-label="YouTube video height"
          />
        </Field.Root>
      </GridLayout>
    </>
  );
};

export default Embeds;
