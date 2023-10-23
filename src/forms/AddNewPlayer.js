import React, { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./addNewPlayer.scss";
import DataFetch from "../hooks/DataFetch";
import { BasketmaniaContext } from "../context/BasketmaniaContext";
import { useNavigate } from "react-router-dom";

export const AddNewPlayer = ({
  show,
  setShow,
  players,
  setPlayers,
  onePlayer,
  setOnePlayer,
}) => {
  const [newPlayer, setNewPlayer] = useState(
    onePlayer
      ? onePlayer
      : {
          id: "bskmn_" + new Date().getTime(),
          name: "",
          lastName: "",
          number: "",
          height: "",
          bornDate: "",
          pos: "",
        }
  );
  const { addPlayer, deletePlayer } = DataFetch();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const context = useContext(BasketmaniaContext);
  console.log(newPlayer);

  const handleClose = () => {
    setMsg("");
    setShow(false);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const handleSubmit = () => {
    addPlayer(newPlayer)
      .then((res) => {
        console.log(res);
        setMsg(res);
        !onePlayer
          ? setPlayers([...players, newPlayer])
          : setOnePlayer(newPlayer);
        setNewPlayer({
          id: "bskmn_" + new Date().getTime(),
          name: "",
          lastName: "",
          number: "",
          height: "",
          bornDate: "",
          pos: "",
        });
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deletePlayer(id)
      .then((res) => {
        setMsg("Jugador eliminado correctamente");
        navigate("/players/editor/edit");
      })
      .catch((error) => console.log(error));
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
          <h1>Nuevo jugador</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="principalAddNewPlayer">
          <div className="insidePrincipalAddNew">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
              <Form.Control
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={newPlayer.name}
                name="name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Apellidos</InputGroup.Text>
              <Form.Control
                placeholder="Apellidos"
                aria-label="Apellidos"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={newPlayer.lastName}
                name="lastName"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Dorsal"
                aria-label="Dorsal"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={newPlayer.number}
                name="number"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Altura</InputGroup.Text>

              <Form.Control
                type="number"
                placeholder="Altura"
                aria-label="Altura"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={newPlayer.height}
                name="height"
              />
              <InputGroup.Text id="basic-addon1">cms</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Posición</InputGroup.Text>
              <Form.Select
                aria-label="Seleccionar posición"
                value={newPlayer.pos}
                name="pos"
                onChange={handleChange}
              >
                <option>Seleccionar posición</option>
                <option value="Base">Base</option>
                <option value="Escolta">Escolta</option>
                <option value="Alero">Alero</option>
                <option value="Ala pívot">Ala pívot</option>
                <option value="Pívot">Pívot</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Fecha Nacimiento
              </InputGroup.Text>

              <Form.Control
                type="date"
                placeholder="Fecha de nacimiento"
                aria-label="Fecha de nacimiento"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={newPlayer.bornDate}
                name="bornDate"
              />
            </InputGroup>
          </div>
        </div>
        <p className="errorMsg">{msg}</p>
      </Modal.Body>
      <Modal.Footer>
        {onePlayer && (
          <Button
            variant="secondary"
            onClick={() => handleDelete(newPlayer.id)}
          >
            Eliminar Jugador
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button className="enterButtonAdd" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
