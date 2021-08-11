import React from 'react';
import './Header.css';
import {createTheme,ThemeProvider, TextField, MenuItem } from '@material-ui/core';
import categories from '../data/category';

const Header = ({category , setcategory, word , setword, setMeanings, LightTheme}) =>{
    const darkTheme = createTheme({
        palette: {
            primary:{
                main: LightTheme ? "#000" : "#fff",
            },
            type: LightTheme ? "light" : "dark",
        },
      });

      const handlechange = (Language) =>{
        setcategory(Language);
        setword("");
        setMeanings([]);
      }

    return (
    <div className="header">
        <span className="title">{word ? word : "Word Finder"} </span>
        <div className="inputs">  
            <ThemeProvider theme={darkTheme}>
                <TextField 
                    id="standard-basic" 
                    label="Search a Word" 
                    className="search" 
                    value={word}
                    onChange={(e)=>setword(e.target.value)}
                    />
                <TextField
                    select
                    className="select"
                    label= "Language"
                    value= {category}
                    onChange= {(e)=>handlechange(e.target.value)}
                >

            {
                categories.map((option) =>(
                    <MenuItem key= {option.label} value={option.label} >
                        {option.value}
                    </MenuItem>
                ))
            }
            
                 </TextField>
            </ThemeProvider>
            
        </div>
    </div>
    );
};

export default Header;
