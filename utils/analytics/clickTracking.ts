import ahoyTrack from './ahoyTrack';

const existingProperties = ( object: Object ) => {
  const found = {};

  Object.keys( object ).forEach(( key: string ) => {
    if ( object[key as keyof object] != null ) {
      found[key as keyof object] = object[key as keyof object];
    }
  });

  return found;
};

const trackEvent = (
  event: string,
  properties: Record<string, any>,
  removeEmptyProperties: boolean = true
) => {
  if ( typeof window === 'undefined' ) return;
  const propertiesForEvent = Object.assign( properties, { page: window.location.pathname });
  ahoyTrack(
    event,
    removeEmptyProperties ? existingProperties( propertiesForEvent ) : propertiesForEvent
  );
};


const trackClick = ( properties: Record<string, any> ) => {
  trackEvent( '$click', properties );
};

const trackClicks = ( selector: string ) => {
  // properties can be added or overridden using data-analytics attributes
  // on $click targets with semicolon separated `key: value` data
  // e.g. "position: 1; text: donut"
  const specialProperties = ( data: string ) => {
    const cast = ( value: string ) => {
      if ( /^true$/i.test( value )) {
        return true;
      }
      if ( /^false$/i.test( value )) {
        return false;
      }
      if ( /^-?\d*\.?\d+$/.test( value )) {
        return Number( value );
      }
      return value;
    };

    const entries: {
      [key: string]: boolean | number | string;
    } = {};

    if ( data ) {
      data.split( ';' ).forEach(( datum ) => {
        const entry = datum.split( ':' );
        if ( entry[1]) {
          entries[entry[0].trim()] = cast( entry[1].trim());
        }
      });
    }

    return entries;
  };

  document.addEventListener( 'click', ( event: any ) => {
    const tracked = event.target.closest( selector );

    if ( tracked && tracked.className.indexOf( 'no-track' ) === -1 ) {
      trackClick({
        class: tracked.className || null,
        href: tracked.href,
        id: tracked.id || null,
        section: tracked
          .closest( '[data-section]' )
          ?.getAttribute( 'data-section' ),
        tag: tracked.tagName.toLowerCase(),
        text:
          tracked instanceof HTMLInputElement
            ? tracked.value
            : ( tracked.textContent || tracked.innerText || tracked.innerHTML )
                .replace( /[\s\r\n]+/g, ' ' )
                .trim(),
        ...specialProperties( tracked.dataset.analytics ),
      });
    }
  });
};

const clickTracking = {
  trackClick,
  trackClicks,
  trackEvent,
};

export default clickTracking;
