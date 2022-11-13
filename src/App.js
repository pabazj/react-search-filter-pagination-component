import React, { useState, useEffect } from 'react'
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

import UniversityList from './components/UniversityList'
import useFetch from './customHooks/useFetch'

import debounce from 'lodash.debounce';

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

  const [code, setCode] = useState('Select by Code');
  const [searchTearm, setSearchTearm] = useState('');

  let { universities, loaded, codeList, searchList, getData, getSearchResults, setSearchList } = useFetch(baseURL, searchTearm)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (searchTearm !== '') {
      getSearchResults()
    }
    else {
      setSearchList([])
    }
  }, [searchTearm])

  const handleSearch = debounce((country) => {
    setSearchTearm(country)
  }, 1000)

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const byCategory = (university, code) => {
    if (code !== 'Select by Code') {
      return university.alpha_two_code === code;
    } else return university;
  };

  const handleUniList = (universities, code, searchList) => {

    if (searchTearm !== '') {
      return searchList
    }
    else {
      return universities
        .filter(university => byCategory(university, code))
    }
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
          <UniversityList uniList={handleUniList(universities, code, searchList)} />
        </HeaderWrapperDiv>
      </Box>
    </Container>
  );
}


export default App;
