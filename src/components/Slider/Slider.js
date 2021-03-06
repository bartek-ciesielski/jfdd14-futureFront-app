import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  margin: {
    height: theme.spacing(1),
  },
}));

export default function CustomizedSlider(props) {
  const prices = props.gifts.map((el) => +el.price);
  const maxValue = Math.max(...prices);
  const [value, setValue] = useState([0, maxValue]);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleSlider(newValue);
  };
  return (
    <div className={classes.root}>
      <Typography variant="caption">Zakres ceny:</Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        getAriaLabel={() => "slider"}
        value={value}
        onChange={handleChange}
        max={maxValue}
      />
      <div className={classes.margin} />
      <div className={classes.margin} />
    </div>
  );
}

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
