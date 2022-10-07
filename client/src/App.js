import React, {createContext, useState} from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleComment from './pages/SingleComment';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const updateUser = (userData) => {
    setUser(userData)
  }
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={user}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login setUser={updateUser}/>}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route
                path="/comment/:id"
                element={<SingleComment />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>  
          </div>
          <Footer />
        </div>
        </Router>
        </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
