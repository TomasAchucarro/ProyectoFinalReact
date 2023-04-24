import { DialogContentText, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import funcion from "../../../Funciones";
import { useNavigate } from "react-router-dom";
import dataContext from "../../../Funciones/dataContext";

export default function ModalUser({ open, handleClose, order }) {
  const { updateStorage, setUpdateStorage } = useContext(dataContext);

  const { addItem, getOrder, deleteItem } = funcion;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstEmail, setFirstEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleSubmit = async (orderNum) => {
    if (typeof orderNum !== "undefined") {
    
      deleteItem(orderNum);
      return navigate("/");
    }

    if (
      firstEmail !== confirmEmail ||
      name === "" ||
      fullname === "" ||
      phoneNumber === ""
    ) {
      return;
    }

    const orden = JSON.parse(localStorage.getItem("orden"));

    addItem(orden);
    localStorage.clear();
    setUpdateStorage("");
    const orderSave = await getOrder();
    navigate(`/${orderSave[0].id}`);
  };

  console.log(order);
  if (typeof order !== "undefined") {
    return (
      <Dialog
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Paper sx={{ backgroundColor: "gray" }}>
          <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
            {"Felicidades por la compra"}
          </DialogTitle>

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <DialogContentText>
              Compra exitosa de la orden {order}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "black" }}
              onClick={() => handleSubmit(order)}
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Paper sx={{ backgroundColor: "gray" }}>
          <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
            {"Formulario para completar la compra"}
          </DialogTitle>

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <TextField
              label="Nombre"
              variant="filled"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ color: "black" }}
              error={name === ""}
            />
            <TextField
              label="Apellido"
              variant="filled"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              style={{ color: "black" }}
              error={fullname === ""}
            />
            <TextField
              label="Telefono"
              variant="filled"
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
              }
              style={{ color: "black" }}
              inputProps={{ inputMode: "tel", maxLength: 10 }}
              size="sm"
              error={phoneNumber.length < 10}
            />
            <TextField
              label="Email"
              variant="filled"
              type="email"
              value={firstEmail}
              onChange={(e) => setFirstEmail(e.target.value)}
              style={{ color: "black" }}
              error={confirmEmail !== firstEmail}
            />
            <TextField
              label="Confirmar Email"
              variant="filled"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              style={{ color: "black" }}
              error={confirmEmail !== firstEmail}
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => handleSubmit()}
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    );
  }
}
