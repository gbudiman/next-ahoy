import ahoy from 'ahoy.js';
// Overloading ahoy track so that it populates the URL for every call
const ahoyTrack = ( name: string, properties = {}) => {
  const propertiesForEvent = Object.assign( properties, {
    url: window.location.href,
  });
  ahoy.track( name, propertiesForEvent );
};

export default ahoyTrack;
