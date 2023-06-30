import { useDispatch, useSelector } from 'react-redux';
import { selectContact, selectFilter } from 'redux/selector';
import { deleteContact } from 'redux/operations';
import { List, Button, ListItemText, ListItem, Box } from '@mui/material';
import { toast } from 'react-hot-toast';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const filter = useSelector(selectFilter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <List
      sx={{
        listStyleType: 'decimal',
        pl: 1,
        '& .MuiListItem-root': {
          display: 'list-item',
        },
        width: 'max-content',
      }}
    >
      {filteredContacts.map(contact => {
        return (
          <ListItem key={contact.id} sx={{ color: 'white' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <ListItemText
                primary={contact.name}
                secondary={contact.number}
              ></ListItemText>
              <Button
                variant="contained"
                onClick={() =>
                  dispatch(deleteContact(contact.id))
                    .then(() => {
                      toast.success('Contact deleted');
                    })
                    .catch(err => {
                      toast.error('Something went wrong(((');
                    })
                }
                sx={{
                  height: 30,
                  background:
                    'radial-gradient(circle, rgb(155 24 24) 16%, rgb(163 28 56) 100%)',
                }}
                type="button"
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ContactList;
