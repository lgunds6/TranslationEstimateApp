import React, { useState, useEffect, useCallback, useRef } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// @ts-ignore
import TranslationQuote from "./TranslationQuote.tsx";
// @ts-ignore
import { ifTickedContext } from "./TranslationQuote.tsx";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "../styles/CustomSelect.scss";

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const languageData = [
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Arabic (Egypt)",
  "Armenian",
  "Azerbaijani",
  "Bajan",
  "English",
  "French",
  "Spanish",
  "Russian",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CustomSelect(props, { ticked, updateTick, setTicked }) {
  const theme = useTheme();

  // @ts-ignore
  const [personName, setPersonName] = useState<string[]>([]);
  const [languageNumber, setLanguageNumber] = useState<number>();

  useEffect(() => {});

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (personName) {
      let x = personName.length;

      setLanguageNumber(x);

      props.onChange(x);
    }
  });

  useEffect(() => {
    if (props.ticked === true) {
      setPersonName([]);
      props.updateTick(false);
      console.log("I can see the value");
    }
  });

  return (
    <div>
      <FormControl
        sx={{ s: 1, width: 380, backgroundColor: "white" }}
        size="small"
      >
        <InputLabel></InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {languageData.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
