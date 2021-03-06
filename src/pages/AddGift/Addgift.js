import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import "./AddGift.css";
import Paper from "@material-ui/core/Paper";
import { database } from "../../components/fireBase.config";

import Uploader from "../../components/Uploader/Uploader";

const Addgift = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [giftAddedText, setGiftAddedText] = useState(false);
  const id = Date.now();
  const isFavorite = false;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const handleChangeName = (e) => {
    setName(e.target.value);
    setGiftAddedText(false);
  };

  const postGiftToDatabase = (
    name,
    category,
    photo,
    price,
    description,
    isFavorite,
    id
  ) => {
    const postData = {
      name: name,
      category: category,
      photo: photo,
      price: price,
      description: description,
      isFavorite: isFavorite,
      id: id,
    };
    const giftKey = database.ref().child("gifts").push().key;
    var updates = {};
    updates["/gifts/" + giftKey] = postData;

    return database.ref().update(updates);
  };
  const addToList = () => {
    props.giftsFetch();
    setName("");
    setCategory("");
    setPhoto("");
    setPrice("");
    setDescription("");
    setGiftAddedText(true);
    postGiftToDatabase(
      name,
      category,
      photo,
      price,
      description,
      isFavorite,
      id
    );
  };

  return (
    <Grid item xs={12} sm={12} md={8} lg={6} justify-content="center">
      <Paper elevation={3} className="formPaper">
        <Container maxWidth="sm" className="formContainer">
          <form className="addGiftForm">
            <h2>DODAJ PREZENT</h2>
            <Box color="text.primary" clone>
              <TextField
                value={name}
                fullWidth
                color="primary"
                onChange={(e) => handleChangeName(e)}
                id="standard-basic"
                label="Nazwa prezentu"
                variant="outlined"
                style={{ paddingBottom: "2vh" }}
              />
            </Box>
            <FormControl
              variant="outlined"
              fullWidth
              color="primary"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Kategoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                label="Kategoria"
                labelWidth={5}
              >
                <MenuItem value="Sport">Sport</MenuItem>
                <MenuItem value="Muzyka">Muzyka</MenuItem>
                <MenuItem value="Elektronika">Elektronika</MenuItem>
                <MenuItem value="Fotoprezenty">Fotoprezenty</MenuItem>
                <MenuItem value="Gry">Gry</MenuItem>
                <MenuItem value="Erotyczne">Erotyczne</MenuItem>
                <MenuItem value="Inne">Inne</MenuItem>
              </Select>
            </FormControl>

            <TextField
              value={photo}
              placeholder="Adres URL lub wybierz plik"
              fullWidth
              color="primary"
              onChange={(e) => setPhoto(e.target.value)}
              id="standard-basic"
              label="Zdjęcie"
              variant="outlined"
              style={{ marginTop: "2vh" }}
            />

            <Uploader setPhoto={setPhoto} />

            <TextField
              color="primary"
              value={price}
              type="number"
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              id="standard-basic"
              label="Cena"
              style={{ paddingBottom: "2vh" }}
              variant="outlined"
            />

            <TextField
              color="primary"
              id="outlined-multiline-static"
              label="Opis prezentu"
              multiline
              rows="4"
              variant="outlined"
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              style={{ paddingBottom: "2vh" }}
            />

            <Button
              className="addGiftButton"
              variant="contained"
              disabled={
                !Boolean(name && category && photo && price && description)
              }
              color="primary"
              onClick={addToList}
            >
              Dodaj!
            </Button>
            {giftAddedText && (
              <div className="giftAdded">
                Prezent dodany pomyślnie! Znajdziesz go w zakładce "Lista
                prezentów"{" "}
              </div>
            )}
          </form>
        </Container>
      </Paper>
    </Grid>
  );
};

export default Addgift;
