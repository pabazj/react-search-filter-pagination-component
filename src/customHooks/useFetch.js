import { useState } from 'react'
// import axios from 'axios';

export default function useFetch(baseURL, searchTearm) {

    const [universities, setUniversities] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [codeList, setCodeList] = useState([]);
    const [searchList, setSearchList] = useState([]);

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

    const getSearchResults = () => {
        let formatSerchTerm = searchTearm.split(' ').join('+')

        fetch(`${baseURL}?country=${formatSerchTerm}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setLoaded(true);
                    setSearchList(result)

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
            setSearchList(result.data);
  
            const filteredCodes = [...new Set(result?.data.map(item => item.alpha_two_code))]
            setCodeList(filteredCodes)
          }
        )
        */
    }

    return { universities, loaded, codeList, searchList, getData, getSearchResults, setSearchList }

}

