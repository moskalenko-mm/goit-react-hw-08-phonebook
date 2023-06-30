import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading } from 'redux/selector';
import { fetchContacts } from 'redux/operations';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Grid, Typography } from '@mui/material';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Grid
      container
      maxWidth="false"
      component="main"
      spacing="50px"
      sx={{
        margin: '0',
        height: '100vh',
        backgroundColor: '#1b2845',
        backgroundImage: 'linear-gradient(315deg, #1b2845 0%, #274060 74%)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
      }}
    >
      <Grid item xs md="auto" lg="auto">
        <Typography
          component="h1"
          variant="h3"
          sx={{ color: 'white', marginBottom: '10px' }}
        >
          Phonebook
        </Typography>
        <ContactForm />
      </Grid>
      <Grid item xs md="auto" lg="auto">
        <Typography component="h2" variant="h5" sx={{ color: 'white' }}>
          Contacts
        </Typography>
        {!isLoading && <Filter />}
        {isLoading && !error && <b>Request in progress...</b>}
        {!isLoading && <ContactList />}
      </Grid>
    </Grid>
  );
};

export default Contacts;
