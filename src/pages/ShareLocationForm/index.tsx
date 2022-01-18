import { useState, useEffect } from "react";
import { ModalWrapper, Reoverlay } from "reoverlay";
import classNames from "classnames";
import Select from "react-select";
import { nanoid } from "nanoid";

import type { Cords } from "components/MapView";
import { addLocation, editLocation, Location } from "store";
import MapView from "components/MapView";
import Input from "components/Input";
import styles from "./ShareLocationForm.module.css";
import { LOCATION_TYPES } from "constants/index";
import { useAppDispatch, useAppSelector } from "hooks";

interface Props {
  cords: Cords;
  id?: null | string;
}

const ShareLocationForm = ({ cords, id }: Props) => {
  const [mapCords, setMapCords] = useState(cords);
  const [name, setName] = useState("");
  const [type, setType] = useState(LOCATION_TYPES[0]);
  const [logo, setLogo] = useState("");

  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.app.locations);

  const isEdit = Boolean(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newLocation: Location = {
      id: id || nanoid(),
      name,
      type,
      logo,
      cords: mapCords,
    };

    if (isEdit) {
      dispatch(editLocation(newLocation));
    } else {
      dispatch(addLocation(newLocation));
    }

    Reoverlay.hideModal();
  };

  useEffect(() => {
    if (!isEdit) return;

    const location = locations.find((item) => item.id === id);

    if (!location) return;

    const { cords, name, logo, type } = location;

    setName(name);
    setLogo(logo);
    setType(type);
    setMapCords(cords);
  }, [id, isEdit]);

  return (
    <ModalWrapper contentContainerClassName={styles.container}>
      <h1 className={styles.modalTitle}>Share location</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>Location name:</label>

          <Input
            type="text"
            placeholder="e.g My favorite cafe"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className={styles.nameInputContainer}
          />
        </div>
        <div className={classNames(styles.row, styles.mapRow)}>
          <label>Location on map:</label>

          <div className={styles.mapContainer}>
            <div className={styles.mapLocker}></div>
            <MapView
              cords={mapCords}
              showPin
              showCta={false}
              showMarkers={false}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label>Location type:</label>

          <Select
            options={LOCATION_TYPES}
            placeholder="Select location type"
            value={type}
            onChange={(newValue) => {
              if (newValue) {
                setType({ label: newValue?.label, value: newValue?.value });
              }
            }}
          />
        </div>

        <div className={classNames(styles.row, styles.imageInputRow)}>
          <label>Logo:</label>
          <Input
            value={logo}
            type="image"
            className={styles.imageInput}
            onChange={(image) => {
              setLogo(image);
            }}
            onImageDeleteClick={() => {
              setLogo("");
            }}
          />
        </div>

        <div className={classNames(styles.row, styles.submitBtnRow)}>
          <button type="submit">
            <span className={styles.buttonText}>Submit</span>
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ShareLocationForm;
