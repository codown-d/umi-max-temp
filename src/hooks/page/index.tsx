import { useAppPageContext } from '@/contexts/AppPageContext';
import { useCallback } from 'react';
import { usePageBreadcrumb } from '..';

export function usePageHeader(title: string, titleDom?: React.ReactNode) {
  let { setHeader } = useAppPageContext();
  let { getPageBreadcrumb } = usePageBreadcrumb(title);
  let setPageHeader = useCallback(() => {
    setTimeout(() => {
      let breadcrumb = getPageBreadcrumb();
      setHeader((pre) => {
        return {
          ...pre,
          title: titleDom || title,
          breadcrumb,
        };
      });
    }, 0);
  }, [getPageBreadcrumb]);
  return { setPageHeader };
}
