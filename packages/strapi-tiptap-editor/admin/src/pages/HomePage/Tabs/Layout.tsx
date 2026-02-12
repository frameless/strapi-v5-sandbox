import { Box, Field, Toggle, Typography } from '@strapi/design-system';
import React from 'react';

import { GridLayout } from '../../../components/ui/GridLayout';

import { EditorOptions, HandleChangeEventType } from './Embeds';

interface LayoutProps {
  values: EditorOptions;

  handleChange: (param: HandleChangeEventType) => void;
}

const Layout: React.FC<LayoutProps> = ({ values, handleChange }) => {
  return (
    <>
      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Table</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="table">
          <Field.Label>Enable table</Field.Label>
          <Toggle
            name="table"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.table}
            onChange={() =>
              handleChange({
                target: {
                  name: 'table',
                  value: !values.table,
                },
              })
            }
          />
        </Field.Root>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Horizontal Rule</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root>
          <Field.Label>Enable horizontal rule</Field.Label>
          <Toggle
            name="horizontal"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.horizontal}
            onChange={() =>
              handleChange({
                target: {
                  name: 'horizontal',
                  value: !values.horizontal,
                },
              })
            }
          />
        </Field.Root>
      </GridLayout>

      <Box marginTop="2rem" marginBottom="1rem">
        <Typography variant="beta">Hardbreak</Typography>
      </Box>

      <GridLayout size="M">
        <Field.Root id="hardbreak">
          <Field.Label>Enable hardbreaks</Field.Label>
          <Toggle
            name="hardbreak"
            onLabel="Enabled"
            offLabel="Disabled"
            checked={values.hardbreak}
            onChange={() =>
              handleChange({
                target: {
                  name: 'hardbreak',
                  value: !values.hardbreak,
                },
              })
            }
          />
        </Field.Root>
      </GridLayout>
    </>
  );
};

export default Layout;
