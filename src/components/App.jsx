import Contacts from 'pages/Contacts';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SingUp';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="singUp" element={<SignUp />} />
      <Route path="contacts" element={<Contacts />} />
    </Routes>
  );
};

export default App;
