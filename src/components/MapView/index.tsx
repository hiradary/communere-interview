import React, { useRef } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { Plus as PlusIcon, MapPin as MapPinIcon } from "react-feather";
import "mapbox-gl/dist/mapbox-gl.css";
import classNames from "classnames";
import { Reoverlay } from "reoverlay";

import { useAppSelector } from "hooks";
import styles from "./MapView.module.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaGlyYWRhcnNoYWRpIiwiYSI6ImNqanM1bnJmNzA1bDAzdm5pbHduNHN5Y3gifQ.243DV4wPZdrnovNeYPsFZA",
});

export interface Cords {
  lng: number;
  lat: number;
  zoom: number;
}

interface Props {
  showPin: boolean;
  showCta: boolean;
  onCtaClick?: (cords: Cords) => void;
  cords: Cords;
  showMarkers: boolean;
}

const MapView: React.FC<Props> = ({
  showPin,
  onCtaClick,
  showCta,
  cords,
  showMarkers,
}) => {
  const mapCords = useRef<Cords>(cords);

  const locations = useAppSelector((state) => state.app.locations);

  const saveNewCords = (map: any) => {
    const { lng, lat } = map.getCenter();
    const zoom = map.getZoom();

    const newCords = {
      lat,
      lng,
      zoom,
    };

    mapCords.current = newCords;
  };

  const openLocationModal = (id: string) => {
    Reoverlay.showModal("LocationModal", { id });
  };

  const renderLocations = () => {
    if (!locations.length) return <React.Fragment></React.Fragment>;

    return locations.map((location) => {
      const coords = location.cords;
      return (
        <Marker
          coordinates={[coords.lng, coords.lat]}
          key={location.id}
          onClick={() => openLocationModal(location.id)}
        >
          <div className={classNames(styles.pin, styles.markersPin)}>
            <MapPinIcon className={styles.pinIcon} width={48} height={48} />
          </div>
        </Marker>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={[mapCords.current.lng, mapCords.current.lat]}
        onMoveEnd={saveNewCords}
        zoom={[mapCords.current.zoom]}
      >
        {showMarkers ? renderLocations() : <React.Fragment></React.Fragment>}
      </Map>

      {showPin && (
        <div className={classNames(styles.pin, styles.mainPin)}>
          <MapPinIcon className={styles.pinIcon} width={48} height={48} />
        </div>
      )}
      {showCta && (
        <div className={styles.buttonContainer}>
          <button
            title="Share location"
            onClick={() => {
              if (onCtaClick) {
                onCtaClick(mapCords.current);
              }
            }}
          >
            <PlusIcon />
            <span className={styles.buttonText}>Share your location</span>
          </button>
        </div>
      )}
    </div>
  );
};

MapView.defaultProps = {
  onCtaClick: () => null,
  cords: {
    lng: -0.11871577436667735,
    lat: 51.507146783470745,
    zoom: 12,
  },
};

export default MapView;
