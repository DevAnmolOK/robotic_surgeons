import React from 'react'

type MapProps = {
    mapSrc: any
}

const Map = ({ mapSrc }: MapProps) => {
    return (
        <iframe
            src={mapSrc}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    )
}

export default Map