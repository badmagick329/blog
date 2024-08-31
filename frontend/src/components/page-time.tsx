'use client';

import { registerView } from '@/actions/actions';
import { useEffect } from 'react';

export default function PageTime({ route }: { route: string }) {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const duration = parseFloat(
        ((performance.now() - start) / 1000).toFixed(2)
      );
      if (duration < 1) {
        return;
      }
      registerView({ route, duration });
    };
  }, []);
  return null;
}
