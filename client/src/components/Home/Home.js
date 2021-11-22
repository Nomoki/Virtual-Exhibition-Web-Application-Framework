import React, { Fragment, useState, useEffect } from 'react'
import { Container, Grow, Grid, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import "./style.css"
import hompic from "./homepic.png"

const Home = () => {
    const history = useHistory();
    return (
        <Fragment>
            <Typography variant="h2" component="div" gutterBottom className='headtop'>
                VISUAL
            </Typography>
            <Typography variant="h1" component="div" gutterBottom className='head'>
                EXHIBITION
            </Typography>
            <img src={hompic} style={{ width: '30%', height: '30%' }} />

            <div className='btnset' style={{ display: 'Flex', flexDirection: 'column' }}>
                <Button size="Large" variant="contained" style={{ backgroundColor: '#BCBCBC', color: 'white' }}
                    onClick={() => {
                        history.push('/explore')
                    }}>EXPLORE</Button><br />
                <Button size="Large" variant="contained" style={{ backgroundColor: '#F9A434', color: 'white' }}
                    onClick={() => {
                        alert('create');
                    }}>CREATE</Button>
            </div>



        </Fragment>
    )
}

export default Home
