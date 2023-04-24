import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import {
  NavigationBar,
  HomeScreen,
  AppPaperScreen,
  LoginScreen,
  ForgotPasswordScreen,
  ChangePasswordScreen,
  DrawScreen,
  EditScreen,
  RegisterScreen,
	ViewScreen
} from './components';
/*
	This is our application's top-level component.
    
	@author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/

let theme = createTheme({
  palette: {
    primary: {
      main: '#b6b4b4e1',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

const App = () => {

  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthContextProvider>
          <GlobalStoreContextProvider>
            {/* <ThemeProvider theme={theme}> */}
            <NavigationBar />
            <AppPaperScreen>
              <Switch>
                <Route path="/" exact component={LoginScreen} />
                <Route path="/home/" exact component={HomeScreen} />
                <Route path="/draw/" exact component={DrawScreen} />
                <Route path="/edit/" exact component={EditScreen} />
                <Route path="/forgotpassword/" exact component={ForgotPasswordScreen} />
                <Route path="/changepassword/" exact component={ChangePasswordScreen} />
                <Route path="/register/" exact component={RegisterScreen} />
                <Route path="/view/" exact component={ViewScreen} />
              </Switch>
            </AppPaperScreen>
            {/* </ThemeProvider> */}
          </GlobalStoreContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
