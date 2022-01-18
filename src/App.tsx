import { Reoverlay, ModalContainer } from "reoverlay";

import Home from "pages/Home";
import ShareLocationForm from "pages/ShareLocationForm";
import Location from "pages/Location";
import "reoverlay/lib/ModalWrapper.css";

Reoverlay.config([
  {
    name: "ShareLocationFormModal",
    component: ShareLocationForm,
  },
  {
    name: "LocationModal",
    component: Location,
  },
]);

function App() {
  return (
    <>
      <Home />
      <ModalContainer />
    </>
  );
}

export default App;
