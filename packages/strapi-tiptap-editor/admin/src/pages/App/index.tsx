import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import HomePage from '../HomePage';
import { queryClient } from '../../utils/queryClient';

export const App = () => (
  <Routes>
    <Route
      index
      element={
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      }
    />
    <Route path="*" element={<Page.Error />} />
  </Routes>
);
