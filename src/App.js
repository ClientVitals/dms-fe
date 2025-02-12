import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import Landing from './pages/Landing';
import UserProvider from './context/user';
import Content from './pages/Content';

const App = () => (
      <BrowserRouter>
        <UserProvider>
          <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/content' element={<Content />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
);

export default App;