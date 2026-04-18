import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { detectLocale } from '@/core/i18n/detectLocale';
import { i18nStore } from '@/core/i18n/store';
import { handleApiError } from './core/api/errorHandler';

import '@/index.css';
import App from '@/App';

i18nStore.setLocale(detectLocale());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
      onError: handleApiError,
    },
    mutations: {
      onError: handleApiError,
    },
  },
});

async function bootstrap() {
  createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

bootstrap();