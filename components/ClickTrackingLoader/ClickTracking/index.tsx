'use client';

import ahoy from 'ahoy.js';
import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clickTracking from '@/utils/analytics/clickTracking';

export default function ClickTracking() {
  const pathname = usePathname();

  const configure = useCallback(() => {
    ahoy.configure({
      startOnReady: true,
    });
  }, []);

  const trackView = useCallback(() => {
    ahoy.trackView({
      page: pathname,
      url: window.location.href,
    });
  }, [pathname]);

  useEffect(() => {
    configure();
    trackView();
    clickTracking.trackClicks( 'a, button, input[type=submit]' );
  }, [configure, trackView]);
}
