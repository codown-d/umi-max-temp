import { useAppData, useLocation } from '@umijs/max';
import { BreadcrumbProps } from 'antd';
import { find } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseAppAccessReturn = { app: boolean; page: boolean };
export function useAppAccess(): UseAppAccessReturn {
  return { app: true, page: true };
}

export function useOverflowTooltip(content: React.ReactNode) {
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const { scrollWidth, clientWidth } = contentRef.current;
        setIsOverflow(scrollWidth > clientWidth);
      }
    };

    // Initial check
    checkOverflow();

    // ResizeObserver to handle content changes
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [content]);

  return { contentRef, isOverflow };
}

export function usePageBreadcrumb(title: string): {
  getPageBreadcrumb: () => BreadcrumbProps;
} {
  const location = useLocation();
  const AppData = useAppData();
  const { routes } = AppData;
  const getPageBreadcrumb = useCallback(() => {
    let item = find(routes, { path: location.pathname }) as any;
    return { items: [...item?.breadcrumb?.items?.slice(0, -1), { title }] };
  }, []);
  return { getPageBreadcrumb };
}
