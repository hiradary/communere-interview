import { Reoverlay } from "reoverlay";

import MapView from "components/MapView";
import type { Cords } from "components/MapView";
import styles from "./Home.module.css";

const initialCenterCords = {
  lng: -0.11871577436667735,
  lat: 51.507146783470745,
  zoom: 12,
};

const Home = () => {
  const openShareLocationFormModal = (cords: Cords) => {
    Reoverlay.showModal("ShareLocationFormModal", {
      cords,
    });
  };

  return (
    <div className={styles.container}>
      <MapView
        cords={initialCenterCords}
        showPin
        showCta
        showMarkers
        onCtaClick={openShareLocationFormModal}
      />
    </div>
  );
};

export default Home;
