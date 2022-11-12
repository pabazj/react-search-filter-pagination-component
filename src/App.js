import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import debounce from 'lodash.debounce';
import axios from 'axios';

import UniversityList from './components/UniversityList'

const baseURL = "http://universities.hipolabs.com/search";

const HeaderWrapperDiv = styled('div')(({ theme }) => ({
  padding: '20px'
}));

const TitleWrapperDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

const SearchWrapperDiv = styled('div')(({ theme }) => ({
  float: 'left',
  paddingTop: '10px'
}));

const SelecterWrapperDiv = styled('div')(({ theme }) => ({
  float: 'right'
}));

function App() {

  const [universities, setUniversities] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [code, setCode] = useState('Select by Code');
  const [codeList, setCodeList] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {

    // Get data using fetch
    fetch(baseURL)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setUniversities(result);

          const filteredCodes = [...new Set(result.map(item => item.alpha_two_code))]
          setCodeList(filteredCodes)
        }
      )


    // Get data using axios
    /*
    axios.get(baseURL)
      .then(
        (result) => {
          setLoaded(true);
          setUniversities(result.data);

          const filteredCodes = [...new Set(result.map(item => item.alpha_two_code))]
          setCodeList(filteredCodes)
        }
      ) 
      */  

  }

  const handleSearch = debounce((serchTerm) => {

    let formatSerchTerm = serchTerm.split(' ').join('+')

    fetch(`${baseURL}?country=${formatSerchTerm}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setUniversities(result)
        }
      )

      // Get data using axios with parameters
      /*
      axios.get(baseURL, {
        params: {
          country: formatSerchTerm
        }
      })
      .then(
        (result) => {
          setLoaded(true);
          setUniversities(result.data);

          const filteredCodes = [...new Set(result?.data.map(item => item.alpha_two_code))]
          setCodeList(filteredCodes)
        }
      )
      */

  }, 1000)

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const byCategory = (university, code) => {
    if (code !== 'Select by Code') {
      return university.alpha_two_code === code;
    } else return university;
  };

  const handleUniList = (universities, code) => {
    return universities
      .filter(university => byCategory(university, code))
  }

  if (!loaded) {
    return <>loading...</>;
  }

  return (
    <Container fixed>
      <Box sx={{ flexGrow: 1 }} >
        <HeaderWrapperDiv >
          <TitleWrapperDiv>
            <Typography variant="h4" gutterBottom>
              Universities
            </Typography>
          </TitleWrapperDiv>
          <div>
            <SearchWrapperDiv>
              <TextField
                size="small"
                type="search"
                name="search"
                id="outlined-basic"
                label="Search by Country"
                variant="outlined"
                onChange={e => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </SearchWrapperDiv>
            <SelecterWrapperDiv>
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Code</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={code}
                  onChange={handleCodeChange}
                  autoWidth
                  label="Code"
                  defaultValue={code}
                >
                  <MenuItem value="Select by Code">Select by Code</MenuItem>
                  {codeList?.map(code => (
                    <MenuItem key={uniqid()} value={code}>{code}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SelecterWrapperDiv>
          </div>
          <UniversityList uniList={handleUniList(universities, code)} />
        </HeaderWrapperDiv>
      </Box>
    </Container>
  );
}


export default App;
