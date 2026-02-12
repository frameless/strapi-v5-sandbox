import { Box, Button, Main, Tabs } from '@strapi/design-system';
import { useNotification, Layouts, Page } from '@strapi/strapi/admin';
import { Check } from '@strapi/icons';
import { Formik } from 'formik';
import { memo } from 'react';
import { useIntl } from 'react-intl';

import defaultSettings from '../../../../utils/defaults';
import { mergeDeep } from '../../utils/merge';
import { useSettings } from '../../hooks/useSettings';

import EmbedsTabContent from './Tabs/Embeds';
import LayoutTabContent from './Tabs/Layout';
import OtherTabContent from './Tabs/Other';
import TextTabContent from './Tabs/Text';

const HomePage = () => {
  const { toggleNotification } = useNotification();
  const { settings, isLoading, updateSettings: updateSettingsMutation, isUpdating } = useSettings();

  const { formatMessage } = useIntl();
  if (isLoading) {
    return (
      <Main aria-busy="true">
        <Layouts.Header title="Strapi TipTap Editor settings" subtitle="Change how the editor should behave" />
        <Layouts.Content>
          <Page.Loading />
        </Layouts.Content>
      </Main>
    );
  }

  // Merge saved settings with default values, in case new ones are added
  const mergedSettings = mergeDeep(defaultSettings, settings);

  const onUpdateSettingsSubmit = async (values: any) => {
    try {
      await updateSettingsMutation(values);
      toggleNotification({
        type: 'success',
        message: formatMessage({ id: 'strapi-tiptap-editor-save-success', defaultMessage: 'Saved' }),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toggleNotification?.({
        type: 'warning',
        message: formatMessage({ id: 'strapi-tiptap-editor-save-error', defaultMessage: 'Save failed' }),
      });
    }
  };

  return (
    <Main aria-busy={isLoading}>
      <Formik initialValues={mergedSettings} onSubmit={onUpdateSettingsSubmit}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Layouts.Header
                title="Strapi TipTap Editor settings"
                subtitle="Change how the editor should behave"
                primaryAction={
                  <Button loading={isUpdating} type="submit" startIcon={<Check />} size="L">
                    Save
                  </Button>
                }
              />
              <Layouts.Content>
                <Box
                  background="neutral0"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={6}
                  paddingBottom={6}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  <Tabs.Root defaultValue="text">
                    <Tabs.List>
                      <Tabs.Trigger value="text">Text</Tabs.Trigger>
                      <Tabs.Trigger value="layout">Layout</Tabs.Trigger>
                      <Tabs.Trigger value="embeds">Embeds</Tabs.Trigger>
                      <Tabs.Trigger value="other">Other</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="text">
                      <Box color="neutral800" padding={4} background="neutral0">
                        <TextTabContent values={values} handleChange={handleChange} />
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="layout">
                      <Box color="neutral800" padding={4} background="neutral0">
                        <LayoutTabContent values={values} handleChange={handleChange} />
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="embeds">
                      {/* Embeds tab content */}
                      <Box color="neutral800" padding={4} background="neutral0">
                        <EmbedsTabContent values={values} handleChange={handleChange} />
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="other">
                      {/* Other tab content */}
                      <Box color="neutral800" padding={4} background="neutral0">
                        <OtherTabContent values={values} handleChange={handleChange} />
                      </Box>
                    </Tabs.Content>
                  </Tabs.Root>
                  {/* Main box end */}
                </Box>
              </Layouts.Content>
            </form>
          );
        }}
      </Formik>
    </Main>
  );
};

export default memo(HomePage);
