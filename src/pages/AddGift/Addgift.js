

import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './AddGift.css'

const Addgift = (props) => {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('Inne')
    const [photo, setPhoto] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [giftAddedText, setGiftAddedText] = useState(false)

    const handleChangeName = (e) => {
        setName(e.target.value);
        setGiftAddedText(false)
    }

    const addToList = () => {
        props.addGift({ name, category, photo, price, description })
        setName('');
        setCategory('Inne');
        setPhoto('');
        setPrice('');
        setDescription('')
        setGiftAddedText(true)
    }

    return (
        <Container fixed className="formContainer" >
            <form >
                <h2>Dodaj swój prezent:</h2>
                <Box className='inputBox' width="30%"><TextField
                    value={name}
                    fullWidth
                    color='secondary'
                    onChange={e => handleChangeName(e)}
                    id="standard-basic"
                    label="Nazwa prezentu" /></Box>
                <Box className='inputBox' width='30%'><FormControl
                    fullWidth
                    color='secondary'
                    id="standard-basic">
                    <InputLabel id="demo-simple-select-label">Kategoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <MenuItem value='Sport'>Sport</MenuItem>
                        <MenuItem value='Muzyka'>Muzyka</MenuItem>
                        <MenuItem value='Inne'>Inne</MenuItem>
                    </Select>
                </FormControl></Box>
                <Box className='inputBox' width="30%"><TextField
                    value={photo}
                    helperText="Adres URL"
                    fullWidth
                    color='secondary'
                    onChange={e => setPhoto(e.target.value)}
                    id="standard-basic"
                    label="Zdjęcie" /></Box>
                <Box className='inputBox' width="30%"><TextField
                    color='secondary'
                    value={price}
                    type='number'
                    fullWidth
                    onChange={e => setPrice(e.target.value)}
                    id="standard-basic"
                    label="Cena w dolarach" /></Box>
                <Box className='inputBox' width="30%"><TextField
                    color='secondary'
                    id="outlined-multiline-static"
                    label="Opis prezentu"
                    multiline
                    rows="4"
                    variant='outlined'
                    fullWidth
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                /></Box>
                <Button
                    variant="contained"
                    disabled={!Boolean(name && category && photo && price && description)}
                    color="secondary"
                    onClick={addToList}>Dodaj!
                </Button>
                {giftAddedText && <div className='giftAdded'>Prezent dodany pomyślnie! Znajdziesz go w zakładce Gifts </div>}
            </form>
        </Container>
    )
}

export default Addgift;

