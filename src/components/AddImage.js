import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BasketmaniaContext } from "../context/BasketmaniaContext";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import {
  getStorage,
  ref as ref2,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import "./addImage.scss";
const storage = getStorage();
export const AddImage = ({ show, setShow, onePlayer, setOnePlayer }) => {
  const [msg, setMsg] = useState("");
  const [userImage, setUserImage] = useState({image: ""});
  const { logged, setLogged, user, setUser } = useContext(BasketmaniaContext);
  const navigate = useNavigate();
  const inputFile = React.useRef();
  const handleClose = () => {
    setMsg("");
    setShow(false);
  };
  console.log(userImage);
  const handleFile = (e) => {
    const img = e.target.files[0];
    console.log(img.name);
    if (
      img.type == "image/jpeg" ||
      img.type == "image/png" ||
      img.type == "image/webp"
    ) {
      setUserImage({image: img });
      setMsg("");
    } else {
      inputFile.current.value = "";
      setMsg("Archivo no compatible");
    }
  };

  const handleSubmit = () => {
    const fileName = "image_" + onePlayer.id;
    const storageRef = ref2(storage, "images/players/" + fileName);
    console.log(storageRef);
    let url = "";
    if(userImage.image != ""){
      uploadBytes(storageRef, userImage.image).then((snapshot) => {
        console.log("subida imagen");
        getDownloadURL(ref2(storageRef)).then(
          (urlImg) => {
            let db = getDatabase();
            url = urlImg.toString();
            set(ref(db, "players/" + onePlayer.id), {
              ...onePlayer,
              image: url,
            });
            setOnePlayer({...onePlayer, image: url});
            inputFile.current.value = "";
            setShow(!show);
          }
        );
      });
    }else{
      let db = getDatabase();
      set(ref(db, "players/" + onePlayer.id), {
        ...onePlayer,
        image: "",
      });
      setOnePlayer({...onePlayer, image: ""});
      inputFile.current.value = "";
      setShow(!show);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="compl_Modal"
      size="md"
    >
      <Modal.Header className="headerModal">
        <img
          className="logoModal"
          src="../images/BasketmaniaWhite2.png"
          alt=""
        />
        <Modal.Title className="title">
          <h1>Añadir imagen</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="principalLogin">
          <div className="insidePrincipalLogin">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="imagen"
                type="file"
                aria-label="imagen"
                aria-describedby="imagen"
                onChange={handleFile}
                value={user.image}
                name="password"
                ref={inputFile}
              />
            </InputGroup>
          </div>
        </div>
        <p className="errorMsg">{msg}</p>
        <p>Pulsa "guardar" sin seleccionar imagen para volver a la imagen por defecto</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="secondary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
