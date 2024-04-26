'use client';
import dynamic from 'next/dynamic';

const ClickTrackingLoader = dynamic(
  // @ts-ignore
  // Idk how to type this import
  () => {
    return import( './ClickTracking' ).then(( module ) => module.default );
  },
  { ssr: false }
);

export default ClickTrackingLoader;
