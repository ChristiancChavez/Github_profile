import './App.css';
//Components
import Header from './Components/Header';
import Form from './Components/Form';
import Profile from './Components/Profile';
//Context
import GitHubContextProvider from './context/gitHubContext';


function App() {
  return (
    <div className="App">
      <GitHubContextProvider>
        <Header />
        <Form />
        <Profile />
      </GitHubContextProvider>
    </div>
  );
}

export default App;
