import axios from 'axios';
import humps from 'humps';
import * as Sentry from '@sentry/react';

export const domain = process.env.NEXT_PUBLIC_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}`;
    

//  Add Base URL and change snake_case to camelCase
const baseAxios = axios.create({
  baseURL: `${domain}`,
  transformResponse: [...axios.defaults.transformResponse, humps.camelizeKeys],
  transformRequest: [decamelize, ...axios.defaults.transformRequest],
});

// Request Interceptor
baseAxios.interceptors.request.use((config) => ({
  ...config,
  params: humps.decamelizeKeys(config.params),
}));

// Response Interceptor for error logging
baseAxios.interceptors.response.use(
  (response) => response, // Pass successful responses directly
  (error) => {
    // Check if the error has a response (i.e., server responded)
    const errorInfo = {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status || 'Network Error',
      data: error.response?.data || null,
    };

    // Add custom Sentry context for debugging
    Sentry.withScope((scope) => {
      scope.setTag('http.method', error.config?.method);
      scope.setTag('http.status', error.response?.status || 'Network Error');
      scope.setContext('API Error', errorInfo);
      Sentry.captureException(error); // Send error to Sentry
    });

    // Optional: Customize the error message before throwing it
    const customErrorMessage =
      error.response?.data?.message || error.message || 'Unknown API error';
    throw new Error(customErrorMessage);
  }
);

export default baseAxios;

// Helper function for decamelizing keys in requests
function decamelize(object) {
  if (!(object && !(object instanceof File))) return object;

  if (object instanceof FormData) {
    const formData = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of object.entries()) {
      formData.append(humps.decamelize(key), value);
    }
    return formData;
  }

  if (typeof object === 'object') {
    return humps.decamelizeKeys(object);
  }

  // Add a default return value to satisfy ESLint
  return object;
}
