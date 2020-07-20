import React, { useState, useEffect, useContext } from 'react'
import { LinksContext } from '../../context/LinksContext';
import styled from 'styled-components'
import { CopyShortLink } from './CopyShortLink'
import { LinkCopyButton } from './LinkCopyButton'
import { breakpoint } from '../../Styles'
import { useCopyLink } from '../../utilities/useCopyLink';

const LinkContainer = styled.div`
    position: relative;
    top: -15vh;
    width: 80vw;
    height: min-content;
    margin: auto;
    @media (min-width: ${breakpoint}) {
        top: -10vh;
    }
`

const Link = styled.div`
    min-height: 15vh;
    background: #FFF;
    width: 80vw;
    padding: 2vh 2vw;
    margin: 2vh 0 2vh 0;
    border-radius: 15px;
    @media (min-width: ${breakpoint}){
        display: flex;
        align-items: center;
        height: 10vh;
    }
`

const FullLink = styled.div`
    flex: 3;
    height: 5vh;
    line-height: 5vh;
    width: 76vw;
    overflow-y: auto;
    overflow-x: auto;
    hyphens: none;
    @media (min-width: ${breakpoint}) {
        overflow: hidden;
        text-overflow: ellipsis;
    }
`


export const Links = () => {
    const [ links, setLinks ] = useContext(LinksContext);
    const [ copiedLink, copyLink ] = useCopyLink();
    useEffect(() => {
        if (localStorage.shortlyLinks) setLinks(links => JSON.parse(localStorage.shortlyLinks))
    }, []);
    return( 
    <LinkContainer className="linkContainer">
        {
        links.map( ({_id, full}) => {
            return <Link key={_id} className="link">
                <FullLink>{full}</FullLink>
                <CopyShortLink shortUrl={_id}/>
                <LinkCopyButton id={_id} copiedLink={copiedLink} copyLink={copyLink}/>
            </Link> 
        })
        }
    </LinkContainer> 
    )
}

// <Link className="link" key={link[0]}><div className="fullLink">{link[1]}</div><ShortLink readOnly="readonly" className="shortLink" value={`https://rel.ink/${link[0]}`}><a href={`https://rel.ink/${link[0]}`}>{`https://rel.ink/${link[0]}`}</a></ShortLink><div className="button"><Button value={`https://rel.ink/${link[0]}`} onClick={copyToClipboard}>{copyButton}</Button></div></Link></LinkContainer>