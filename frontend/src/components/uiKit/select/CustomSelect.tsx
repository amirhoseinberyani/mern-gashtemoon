import { Autocomplete, TextField, Typography } from '@mui/material';
import clsx from 'clsx';
import { FetchContext } from 'contexts/fetchContext';
import { translate } from 'localization';
import { useContext, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import './index.styles.css';

export interface SelectProps {
  label?: JSX.Element | string;
  placeholder?: string;
  api?: string;
  value?: any;
  disabled?: boolean;
  multiple?: boolean;
  valueKey: string;
  labelKey: string;
  defaultValue?: any;
  classes?: {
    base?: string;
    label?: string;
    input?: string;
  };
  onChange?: (value: any) => void;
  onSelect?: (item: any, value: any) => void;
  required?: boolean;
  queries?: { text: string; field: any }[];
  options?: any[];
  defaultMode?: 'first' | 'clear';
  clearFlag?: boolean;
  margin?: string;
  sx?: object;
  onBlur?: () => void;
  state?: any;
}

export default function CustomSelect({
  label,
  placeholder,
  api,
  queries,
  classes,
  onChange,
  onSelect,
  valueKey,
  labelKey,
  defaultValue,
  options,
  disabled,
  multiple = false, // Default to false
  required,
  onBlur,
  margin,
  sx,
  state,
}: SelectProps) {
  const { request, loading } = useContext(FetchContext);

  const [list, setList] = useState<any[]>([]);
  const [value, setValue] = useState<any>(multiple ? [] : null); // Initialize value based on `multiple`
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (!state || list.length === 0) return;

    if (multiple) {
      if (Array.isArray(state)) {
        if (typeof state[0] === 'object') {
          setValue(state); // If state already has full objects, just set them.
        } else {
          // If state is an array of IDs (e.g., [1, 2, 3]), find the matching objects.
          const matched = list.filter((item) => state.includes(item[valueKey]));
          setValue(matched);
        }
      }
    } else {
      if (typeof state === 'object') {
        setValue(state);
      } else {
        const matched = list.find((item) => item[valueKey] === state);
        if (matched) {
          setValue(matched);
        }
      }
    }
  }, [state, list, multiple]);

  // Fetch list of options based on `api` or `options`
  async function createList() {
    let tempList = [];
    if (api) {
      let url = api + '?KeyWord=' + searchValue;
      if (queries && queries.length > 0) {
        queries.forEach((item) => {
          url = url + `&${item.text}=${item.field === null ? '' : item.field}`;
        });
      }
      await request(url, 'GET').then(({ status, data }) => {
        if (status === 200) {
          tempList = data.lists;
        }
      });
    } else if (options) {
      tempList = options;
    }
    setList([...tempList]);
  }

  useEffect(() => {
    createList();
  }, [api, searchValue, JSON.stringify(queries), JSON.stringify(options)]);

  const onChangeHandler = (event: any, selectedValue: any) => {
    setValue(selectedValue);

    if (multiple) {
      onChange && onChange(selectedValue); // full array of objects
    } else {
      onChange && onChange(selectedValue?.[valueKey] ?? null);

      onSelect && onSelect(selectedValue, selectedValue?.[valueKey] ?? null);
    }
  };

  const onBlurHandler = () => {
    onBlur && onBlur();
  };

  const searchHandler = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Autocomplete
      sx={{
        height: 40,
        margin: margin,
        ...sx,
      }}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      disabled={disabled}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value} // This is the key part for default values to be set
      options={list}
      getOptionLabel={(option) => option[labelKey]}
      multiple={multiple} // Enables multiple selections
      noOptionsText={translate.uiKit.noOptionText}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={
            <Typography
              variant="body2"
              className={clsx('label', { [classes?.label ?? '']: classes?.label })}
            >
              {label}
            </Typography>
          }
          variant="outlined"
          hiddenLabel
          required={required}
          onChange={(e) => searchHandler(e.target.value)}
          classes={{ root: 'textFieldRoot' }}
        />
      )}
    />
  );
}
