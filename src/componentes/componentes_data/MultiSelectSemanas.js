import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, createFilterOptions } from "@mui/material";
import CheckBox from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import { Checkbox } from "@material-ui/core";
import axios from "axios";
 
const MultiSelectSemanas = ({
  items,
  selectedValues,
  label,
  placeholder,
  selectAllLabel,
  noOptionsText,
  limitTags,
  onToggleOption,
  onClearOptions,
  onSelectAll
  
}) => {
  const allSelected = items.length === selectedValues.length;
  
  const handleToggleSelectAll = () => {
    onSelectAll && onSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    console.log(reason)
    if (reason === "selectOption" || reason === "removeOption") {
      if (selectedOptions.find(option => option.Semana === "Seleccionar Todas")) {
        handleToggleSelectAll();
      } else {
        onToggleOption && onToggleOption(selectedOptions);
      }
    } else if (reason === "clear") {
      onClearOptions && onClearOptions();
    }
  };
  const getOptionLabel = (option) => option.Semana;


  const optionRenderer = (props, option, { selected }) => {
    const selectAllProps = option.Semana === "Seleccionar Todas" ? { checked: allSelected } : {};
      
    if (option.Semana != null) {
      return (
        <li {...props} style={{ fontSize:'.7em' }}>
          <Checkbox
            icon={icon}
            checkedIcon={checked}
            style={{ marginRight: 8 }}
            checked={selected}
            {...selectAllProps}
          />
          {getOptionLabel(option)}
        </li>
      );
    } else if (option.Periodo != null) {
      return (
        <li {...props} style={{ fontSize:'.7em' }}>
          <Checkbox
            icon={icon}
            checkedIcon={checked}
            style={{ marginRight: 8 }}
            checked={selected}
            {...selectAllProps}
          />
          {option.Periodo}
        </li>
      );
    } else if (option.trimestres != null) {
      return (
        <li {...props} style={{ fontSize:'.7em' }}>
          <Checkbox
            icon={icon}
            checkedIcon={checked}
            style={{ marginRight: 8 }}
            checked={selected}
            {...selectAllProps}
          />
          {option.trimestres}
        </li>
      );
    } else if (option.semestres != null) {
      return (
        <li {...props} style={{ fontSize:'.7em' }}>
          <Checkbox
            icon={icon}
            checkedIcon={checked}
            style={{ marginRight: 8 }}
            checked={selected}
            {...selectAllProps}
          />
          {option.semestres}
        </li>
      );
    }
  };
  const inputRenderer = params => (
    <TextField {...params} label={label} placeholder={placeholder} />
  );
  const getOptionSelected = (option, anotherOption) =>option.Semana === anotherOption.Semana;

  const filter = createFilterOptions();
    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checked = <CheckBox fontSize="small" />;


    var a = selectedValues.length;
    console.log(a)
    let relativo;
    switch (a) {
      
      case a >=3:
        console.log(a)
        relativo = `Se han seleccionado ${a} opciones`;
        break;
    
      default:
        break;
    }
    
  return(
    <Autocomplete
      multiple
      size="small"
      options={items}
      disableCloseOnSelect
      value={relativo}
      getOptionLabel={getOptionLabel}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
      onChange={handleChange}
      getOptionSelected={getOptionSelected}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        console.log(filtered)
        return [{ idSemana: selectAllLabel, Semana: "Seleccionar Todas" }, ...filtered];
      }}
    />
  );
};

MultiSelectSemanas.defaultProps = {
  limitTags: 5,
  items: [],
  selectedValues: [],
  getOptionLabel: value => value
};

export default MultiSelectSemanas;
