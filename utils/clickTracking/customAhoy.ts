import ahoy from 'ahoy.js';
const isServer = typeof window === 'undefined';

if (!isServer) {
  ahoy.configure({
    urlPrefix: 'http://localhost:2999',
    startOnReady: true,
  });
}

export default ahoy;
