import React, { useRef, useEffect } from 'react';

const GoogleMap = ({ position, zoom }) => {
    const mapRef = useRef(null)

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: position,
            zoom
        });

        new window.google.maps.Marker({
            position,
            map: map
        })
    }, [position, zoom ])

    return (
        <div style={{ width: '100%', height: '63vh' }}
            ref={mapRef}
        >
        </div>
    )
}

export default GoogleMap;