/*
 *	Increment Actual
 */
function incrementActual( base, object, max_limit, speed, key_code ){

	// Base
	base = parseInt(base);

	switch( key_code ) {
		
		// Update to right
		case 39 :

			object.actual.x = parseInt( object.actual.x + speed );			

			// Update bgPosition
			if ( parseInt(object.actual.xbgPosition) < parseInt( max_limit-base ) )
				object.actual.xbgPosition = ( object.actual.xbgPosition + base );
			else
				object.actual.xbgPosition = object.cache.xbgPosition;
			
			// Update x

			return object;

		break;

		default :
			return object;
		break;
	}


}