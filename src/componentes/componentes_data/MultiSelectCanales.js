import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, createFilterOptions } from "@mui/material";
import CheckBox from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import { Checkbox } from "@material-ui/core";

const MultiSelectCanales = ({
  items,
  selectedValues,
  label,
  placeholder,
  selectAllLabel,
  noOptionsText,
  onClose,
  onToggleOption,
  onClearOptions,
  onSelectAll
  
}) => {
  const allSelected = items.length === selectedValues.length;
  
  const handleToggleSelectAll = () => {
    onSelectAll && onSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    if (reason === "selectOption" || reason === "removeOption") {
      if (selectedOptions.find(option => option.canal === "Seleccionar Todas")) {
        handleToggleSelectAll();
      } else {
        onToggleOption && onToggleOption(selectedOptions);
      }
    } else if (reason === "clear") {
      onClearOptions && onClearOptions();
    }
  };
  const getOptionLabel = (option) => option.canal;

  const optionRendererCanal = (props, option, { selected }) => {
    return (
           <li {...props} style={{ fontSize:'.7em' }}>
             <Checkbox
               icon={icon}
               checkedIcon={checked}
               style={{ marginRight: 8 }}
               checked={selected}
             />
             {option.canal}
           </li>
         );
 
  };
  const inputRenderer = params => (
    <TextField {...params} label={label} placeholder={placeholder} />
  );

    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checked = <CheckBox fontSize="small" />;
    const filter = createFilterOptions();


  return(
    <Autocomplete
      multiple
      size="small"
      options={items}
      disableCloseOnSelect
      value={selectedValues}
      getOptionLabel={getOptionLabel}
      renderOption={optionRendererCanal}
      renderInput={inputRenderer}
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [{ id_canal: selectAllLabel, canal: "MI CADENA" }, ...filtered];
      }}
    />
  );
};

MultiSelectCanales.defaultProps = {
  limitTags: 5,
  items: [],
  selectedValues: [],
  getOptionLabel: value => value
};

export default MultiSelectCanales;
