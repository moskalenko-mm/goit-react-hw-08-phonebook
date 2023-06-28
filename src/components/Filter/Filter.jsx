import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <TextField
      onChange={event => dispatch(addFilter(event.target.value))}
      id="filter"
      label="Filter"
      name="filter"
      variant="standard"
    />
  );
};

export default Filter;
