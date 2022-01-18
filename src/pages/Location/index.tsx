import { ModalWrapper, Reoverlay } from "reoverlay";
import { useAppSelector } from "hooks";

import styles from "./Location.module.css";

interface Props {
  id: string;
}

const LocationModal = ({ id }: Props) => {
  const locations = useAppSelector((state) => state.app.locations);
  const location = locations.find((item) => item.id === id);

  const showEditLocationModal = () => {
    Reoverlay.showModal("ShareLocationFormModal", {
      cords: location?.cords,
      id: location?.id,
    });
  };

  if (!location) return null;

  const { logo, name, type } = location;

  return (
    <ModalWrapper contentContainerClassName={styles.container}>
      <h2 className={styles.modalTitle}>{name}</h2>
      {logo && (
        <div className={styles.logoContainer}>
          <img src={logo} alt={`${name}'s Logo`} />
        </div>
      )}
      <span>Location type: {type.label}</span>
      <button title="Edit" onClick={showEditLocationModal}>
        <span className={styles.buttonText}>Edit location</span>
      </button>
    </ModalWrapper>
  );
};

export default LocationModal;
