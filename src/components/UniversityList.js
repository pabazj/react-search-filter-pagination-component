import React, { useState } from 'react'
import uniqid from 'uniqid';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '80%'
}));

const UrlList = styled(List)({
    display: 'flex',
    justifyContent: 'center'
});

const UrlListItem = styled(ListItemButton)({
    padding: '0',
    color: 'blue'
});

const LoadMoreWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '20px'
}));

export default function UniversityList(props) {

    const [paginate, setpaginate] = useState(9);

    const { uniList } = props;

    const load_more = () => {
        setpaginate((prevValue) => prevValue + 9);
    };

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12 }}>
                {uniList.slice(0, paginate).map(uni => (
                    <Grid item xs={2} sm={4} md={4} key={uniqid()}>
                        <Item>
                            <Typography variant="h6" color="text.secondary">
                                {uni.name}
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom>
                                {uni.country}
                            </Typography>

                            <UrlList>
                                <div >
                                    {uni.web_pages?.map(page => (
                                        <UrlListItem size="small" key={uniqid()} onClick={() => openInNewTab(page)}>
                                            {page}
                                        </UrlListItem>
                                    ))}
                                </div>
                            </UrlList>

                        </Item>
                    </Grid>
                ))}

            </Grid>
            <LoadMoreWrapper>
               {uniList?.length != 0 ? <Button variant="contained" color="success" onClick={load_more}>Load More</Button> : null}
            </LoadMoreWrapper>

        </>
    )
}
