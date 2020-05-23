import React from 'react';
import photo from '../Media/Images/league-of-legends-lol-riot-games.jpeg'

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <img src={photo} style={{width: '100%'}} alt=""/>
                <div className="header-text">
                    <h1>Tilt Test</h1>
                    <h3>Making sure that next game is #worth</h3>
                </div>
            </div>
        )
    }
}

export default Header;