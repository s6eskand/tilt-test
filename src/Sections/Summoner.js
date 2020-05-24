import React from 'react';

const API_KEY = 'RGAPI-0ffa8dda-d466-4992-9f3b-779d8bf4a5e2';

class Summoner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summonerNameInput: '',
            summonerName: '',
            profileIconId: 0,
            level: 0,
            summonerId: '',
            accountId: '',
        }
    }

    handleSummonerChange = (e) => {
        this.setState({
            summonerNameInput: e.target.value
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.summonerNameInput}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    summonerName: res.name,
                    profileIconId: res.profileIconId,
                    level: res.summonerLevel,
                    summonerId: res.id,
                    accountId: res.accountId
                })
            })
            .catch(err => console.error(err));

        console.log(this.state)
    };

    render() {
        return (
            <div className="container">
                <div className="about-text">
                    <h3>Just input your Summoner Name and get match statistics for your last 5 games.
                    <br/>
                    <br/>
                        From there you’ll get advice on whether that next game is a great idea or if you should give the ranked climb a little break.
                    </h3>
                </div>
                <div className="submit">
                    <input
                        onChange={this.handleSummonerChange.bind(this)}
                        value={this.state.summonerNameInput}
                        className="submit-input"
                        type="text"
                        placeholder="Your Summoner Name Here..."/>
                    <button onClick={this.handleSubmit.bind(this)} className="submit-btn" >Tilt Test Me</button>
                </div>

            </div>
        )
    }
}

export default Summoner;