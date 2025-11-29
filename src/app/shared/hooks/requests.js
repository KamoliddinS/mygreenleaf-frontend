import { useCallback, useEffect, useRef, useState } from 'react';
import uniqBy from 'lodash/uniqBy';
import { auth } from '../utils/auth';
import baseAxios, { domain } from '../utils/request';
// TODO uncomment this line
import { clearStorage } from '../utils/session';
import { toast } from 'sonner';

export function usePostRequest(options = {}) {
  return useRequest({ method: 'POST', ...options });
}

export function usePutRequest(options = {}) {
  return useRequest({ method: 'PUT', ...options });
}

export function useGetRequest(options = {}) {
  return useRequest({ method: 'GET', ...options });
}

export function useDeleteRequest(options = {}) {
  return useRequest({ method: 'DELETE', ...options });
}

export function usePatchRequest(options = {}) {
  return useRequest({ method: "PATCH", ...options });
}

export function useRequest(options = {}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  async function request(overrideOptions = {}, sync = false) {
    setLoading(true);

    try {
      const { data } = await baseAxios({
        baseURL: options.otherDomain || domain,
        ...auth(),
        ...options,
        ...overrideOptions,
      });
      if (!sync) setResponse(data);
      return { response: data, success: true };
    } catch (e) {
      setError(e.response);
      console.log(e.response);
      if (e.response === undefined) {
      } else if (e.response.status >= 500) {
        toast.error('Server Error', 'error-msg');
      } else if (e.response.status === 401) {
        clearStorage();
        console.log('Unauthorized');
      }

      return { error: e.response, success: false };
    } finally {
      if (!sync) setLoading(false);
    }
  }

  return {
    loading,
    request,
    error,
    response,
    setResponse,
    setError,
    setLoading,
  };
}

export function useLoad(options, dependencies = []) {
  const request = useRequest({ method: 'GET', ...options });

  useEffect(() => {
    request.request();

    return () => {
      request.setResponse([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return request;
}

export function useInfiniteScroll(options, condition = true, dependencies = []) {
  const [page, setPage] = useState(1);
  const items = useGetRequest({
    ...options,
    params: { ...options.params, page },
  });
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    if (condition) loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...dependencies]);

  async function loadItems() {
    const { response } = await items.request();
    const oldItems = items.response ? items.response.items : [];
    const newItems = response ? response.items : [];

    if (!response) return;

    items.setResponse({
      ...response,
      count: response ? response.count : 0,
      items: uniqBy([...oldItems, ...newItems], 'id'),
    });

    setHasMore(page < response.pages);
  }

  function reset() {
    items.setResponse({ count: 0, items: [] });
    setPage(1);
  }

  async function reload() {
    reset();
    await items.request({ params: { ...options.params, page: 1 } });
  }

  const ref = useCallback(
    (node) => {
      if (items.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, items.loading, page]
  );

  return {
    ref,
    ...items,
    hasMore,
    reload,
    reset,
  };
}
