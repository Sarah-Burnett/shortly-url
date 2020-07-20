import React, { useState, useContext } from 'react';
import { ActiveLinkContext } from '../../context/ActiveLinkContext';
import styled from 'styled-components';
import { grey, violet, white, breakpoint } from '../../Styles';
import { DashLinkBtns } from './DashLinkBtns';
import { shortlyUrl } from '../../utilities/url';
import { linkBackgroundColor as background, linkColor as color} from '../../utilities/styling'

const Link = styled.div`
    cursor: pointer;
    max-width: 96vw;
    margin: 2vh 2vw;
    padding: 1vh 1vw;
    position: relative;
    overflow: hidden;
    @media (min-width: ${breakpoint}) {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr auto;
        grid-template-areas: "urls details" "buttons buttons"
    }
`

const Urls = styled.div`
    grid-area: urls;
    position: relative;
    h3, input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    @media (min-width: ${breakpoint}) {
        width: 70%;
    }
`

const Details = styled.div`
    grid-area: details;
    font-size: small;
    @media (min-width: ${breakpoint}) {
        text-align: right;
    }
     @media (max-width: ${breakpoint}){
        border-top: 1px solid ${grey};
        margin-top: 1vh;
        padding-top: 1vh;
    } 
    span {
        font-size: larger;
        white-space: nowrap;
    }
}
`

const Input = styled.input`
    background: none;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    min-width: 50vw;
`

const DashLink = ({link}) => {
    const { _id, date, full, click, short } = link;
    const [ activeLink, setActiveLink ] = useContext(ActiveLinkContext);
    return (
        <Link style={{background: background(link._id, activeLink), color: color(link._id, activeLink)}} onClick={() => setActiveLink(link)}>
             <Urls className="urls">
                    <h3>{full}</h3>
                    <Input id={short} value={shortlyUrl + short} readOnly/>
                </Urls>
                <Details className="details">
                    <p>CREATED <span>{date.toString() && date.toString().substr(0,10)}</span></p>
                    <p>CLICKS <span>{click.length}</span></p>
                </Details>
                { _id === activeLink._id && <DashLinkBtns link={link}/> }
        </Link>
    )
}

export default DashLink