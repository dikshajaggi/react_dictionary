import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Switch, withStyles } from '@material-ui/core';
import './App.css';
import Header from './components/header/Header';
import Definitions from './components/Definitions/Definitions';
import { grey } from '@material-ui/core/colors';

function App() {
  const [meanings , setmeanings] = useState([]);
  const [word, setword] = useState("");
  const [category, setcategory] = useState("en");
  const [LightTheme, setLightTheme] = useState(false);

  const Mode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async() => {
    try{
      const data = await axios.get( `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      setmeanings(data.data);
    }
    catch(error){
      console.log(error);
    }
  };

  console.log(meanings);

  useEffect(() =>{
    dictionaryApi();
  }, [word, category]);
  
  return (
    <div className="App" style={{
      height: "100vh",
      backgroundColor: LightTheme ? "#fff" : "#282c34",
      color: LightTheme ? "black" : "white",
      transition: "all 0.5s linear"}}>
  
  
      <Container maxWidth="md" style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-evenly",
          }}> 
           <div
            style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
          >
            <span>{LightTheme ? "Dark" : "Light"} Mode</span>
            <Mode
              checked={LightTheme}
              onChange={() => setLightTheme(!LightTheme)}
            />
          </div>
  
          <Header category={category}  setcategory={setcategory} word={word} setword={setword} LightTheme={LightTheme}/> 
  
          {meanings && (<Definitions word={word} category={category} meanings={meanings} LightTheme={LightTheme}/>)}
      </Container>
    </div>
  );
}

export default App;
