import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContact } from 'redux/selector';
import { addContact } from 'redux/operations';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      return alert(`Contact "${name}" is already in contacts list`);
    }
    dispatch(addContact({ name, number }));
    toast.success('Contact added');
    form.reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        border: '2px dashed #ffffff',
        borderRadius: '5px',
        padding: '15px',
        width: 'max-content',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <TextField
          onChange={handleChange}
          label="Name"
          name="name"
          id="contactName"
          required
          inputProps={{
            pattern:
              "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
            title:
              "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
          }}
        />
        <TextField
          onChange={handleChange}
          label="Number"
          id="contactNumber"
          required
          name="number"
          inputProps={{
            pattern:
              '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
            title:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
          }}
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          height: 35,
          width: '150px',
          background:
            'linear-gradient(137deg, rgba(209,0,255,1) 4%, rgba(19,19,152,1) 47%, rgba(0,212,255,1) 92%)',
        }}
        type="submit"
      >
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;
