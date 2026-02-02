import { Box } from '@strapi/design-system';
import { StatusBadge as UtrechtStatusBadge } from '@utrecht/component-library-react';
import type { StatusBadgeProps as UtrechtStatusBadgeProps } from '@utrecht/component-library-react';
import { forwardRef } from 'react';
import type { ForwardedRef, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';

import usePluginConfig from '../../hooks/use-plugin-config';
import { getTranslation } from '../../utils/getTranslation';

interface StatusBadgeProps extends UtrechtStatusBadgeProps {
  gap?: boolean;
}

export const StatusBadge = forwardRef(
  ({ gap, ...resProps }: PropsWithChildren<StatusBadgeProps>, ref: ForwardedRef<HTMLSpanElement>) => {
    const { formatMessage } = useIntl();
    const { config } = usePluginConfig();

    const regex = /^(development|acceptance)$/;

    if (!config?.env_label || !regex.test(config.env_label)) return null;

    return (
      <Box className="utrecht-theme" marginTop={gap ? 5 : undefined} marginBottom={gap ? 5 : undefined}>
        <UtrechtStatusBadge ref={ref} status="warning" {...resProps}>
          {formatMessage({
            id: getTranslation(`${config?.env_label}-env-label-message`),
          })}
        </UtrechtStatusBadge>
      </Box>
    );
  },
);

StatusBadge.displayName = 'StatusBadge';
