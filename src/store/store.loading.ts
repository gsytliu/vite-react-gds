import { create } from 'zustand';
import { useCallback, useLayoutEffect } from 'react';
import { useUnmountedRef } from 'ahooks';

export const screenLoading = create<{
  loading: boolean;
  tip: React.ReactNode;
  setLoading: (loading: boolean, tip?: React.ReactNode) => void;
}>((set) => ({
  loading: false,
  tip: '',
  setLoading: (loading: boolean, tip: React.ReactNode = '') => {
    set({
      loading,
      tip,
    });
  },
}));

export const useScreenLoading = (initLoading = false) => {
  const { loading, tip, setLoading } = screenLoading();
  const unmounted = useUnmountedRef();

  const startLoading = useCallback(
    (tip: React.ReactNode = '') => {
      if (unmounted.current) return false;
      setLoading(true, tip);
    },
    [setLoading, unmounted],
  );

  const stopLoading = useCallback(
    (tip: React.ReactNode = '') => {
      if (unmounted.current) return false;
      setLoading(false, tip);
    },
    [setLoading, unmounted],
  );

  useLayoutEffect(() => {
    initLoading && startLoading();
  }, [initLoading, startLoading]);

  return {
    loading,
    tip,
    setLoading,
    stopLoading,
    startLoading,
  };
};

const contentLoading = create<{
  loading: boolean;
  tip: React.ReactNode;
  setLoading: (loading: boolean, tip?: React.ReactNode) => void;
}>((set) => ({
  loading: false,
  tip: '',
  setLoading: (loading: boolean, tip: React.ReactNode = '') => {
    set({
      loading,
      tip,
    });
  },
}));

export const useContentLoading = (initLoading = false) => {
  const { loading, tip, setLoading } = contentLoading();
  const unmounted = useUnmountedRef();

  const startLoading = useCallback(
    (tip: React.ReactNode = '') => {
      if (unmounted.current) return false;
      setLoading(true, tip);
    },
    [setLoading, unmounted],
  );

  const stopLoading = useCallback(
    (tip: React.ReactNode = '') => {
      if (unmounted.current) return false;
      setLoading(false, tip);
    },
    [setLoading, unmounted],
  );

  useLayoutEffect(() => {
    initLoading && startLoading();
    return () => {
      stopLoading();
    };
  }, [initLoading, startLoading, stopLoading]);

  return {
    loading,
    tip,
    startLoading,
    stopLoading,
    setLoading,
  };
};
