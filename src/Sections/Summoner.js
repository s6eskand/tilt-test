import React from 'react';
import SummonerInfo from "./SummonerInfo";
import { Link } from 'react-scroll';

const API_KEY = 'RGAPI-2796cb25-cce9-4a87-8671-419897d8a8e2';

class Summoner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allChampions: {},
            mostPlayed: {},
            summonerNameInput: '',
            summonerName: '',
            profileIconId: 0,
            level: 0,
            summonerId: '',
            accountId: '',
            rankedInfo: {},
            matches: [],
            opacity: '0',
        }
    }

    componentDidMount() {
        fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
            .then(res => res.json())
            .then(res => {
                const champions = res.data;
                this.setState({allChampions: champions})
            })
            .catch(err => console.error(err));
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

        await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.state.summonerId}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                const mostPlayed = res[0];
                this.setState({mostPlayed})
            })
            .catch(err => console.error(err));

        await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.state.summonerId}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                let rankedInfo = [];
                if (res[0].queueType === "RANKED_SOLO_5x5") {
                    rankedInfo = res[0];
                }
                else {
                    rankedInfo = res[1];
                }
                this.setState({rankedInfo})
            })
            .catch(err => console.log(err));

        await fetch(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}?queue=420&api_key=${API_KEY}`)
            .then(res => res.json())
            //.then(res => console.log(res))
            .then(res => {
                const matches = [];
                for (let i = 0; i < 5; i++) {
                    matches.push(res.matches[i]);
                }
                this.setState({matches})
            })
            .catch(err => console.error(err));

        this.setState({
            opacity: '1',
        });

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
                <div className="submit" style={{zIndex: 20}}>
                    <input
                        onChange={this.handleSummonerChange.bind(this)}
                        value={this.state.summonerNameInput}
                        className="submit-input"
                        type="text"
                        placeholder="Your Summoner Name Here..."/>
                    <Link to="summonerInfo"><button onClick={this.handleSubmit.bind(this)} className="submit-btn" >Tilt Test Me</button></Link>
                </div>
                <SummonerInfo
                    id="summonerInfo"
                    opacity={this.state.opacity}
                    name={this.state.summonerName}
                    rank={this.state.rankedInfo}
                    champions={this.state.mostPlayed}
                    allChampions={this.state.allChampions}
                />
            </div>
        )
    }
}

export default Summoner;