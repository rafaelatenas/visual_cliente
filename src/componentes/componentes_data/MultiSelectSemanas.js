import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, createFilterOptions } from "@mui/material";
import CheckBox from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import { Checkbox } from "@material-ui/core";

const MultiSelectSemanas = ({
  items,
  label,
  placeholder,
  selectAllLabel,
  noOptionsText,
  limitTags,
  onChange
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const allSelected = items.length === selectedOptions.length;
  console.log(items.length)
  console.log(selectedOptions.length)
  const handleToggleOption = selectedOptions =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const getOptionLabel = option => `${option.label}`;
  const handleSelectAll = isSelected => {
    if (isSelected) {
      setSelectedOptions(items);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };


  const handleChange = (event, selectedOptions, reason) => {
    if (reason === "select-option" || reason === "remove-option") {
      if (selectedOptions.find(option => option.value === "select-all")) {
        handleToggleSelectAll();
        let result = [];
        result = items.filter(el => el.value !== "select-all");
        return onChange(result);
      } else {
        handleToggleOption && handleToggleOption(selectedOptions);
        return onChange(selectedOptions);
      }
    } else if (reason === "clear") {
      handleClearOptions && handleClearOptions();
    }
  };


  const optionRenderer = (props, option, { selected }) => {
    const selectAllProps =
      option.value === "select-all" // To control the state of 'select-all' checkbox
        ? { checked: allSelected }
        : {};
    return (
        <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checked}
          style={{ marginRight: 8 }}
          checked={selected}
          {...selectAllProps}
        />
        {option.Semana}
      </li>
    );
  };
  const inputRenderer = params => (
    <TextField {...params} label={label} placeholder={placeholder} />
  );

  const filter = createFilterOptions();
    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checked = <CheckBox fontSize="small" />;
  return (
    <Autocomplete
      multiple
      size="small"
      options={items}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.Semana}
      renderOption={optionRenderer}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue:inputValue,
                name: `Add "${inputValue}"`,
            });
        }
        return filtered
    }}

      renderInput={inputRenderer}
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
