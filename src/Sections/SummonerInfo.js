import React from 'react';
import iron from '../Media/Images/ranked_emblems/Emblem_IRON.png';
import bronze from '../Media/Images/ranked_emblems/Emblem_BRONZE.png';
import silver from '../Media/Images/ranked_emblems/Emblem_SILVER.png';
import gold from '../Media/Images/ranked_emblems/Emblem_GOLD.png';
import plat from '../Media/Images/ranked_emblems/Emblem_PLATINUM.png';
import diamond from '../Media/Images/ranked_emblems/Emblem_DIAMOND.png';
import master from '../Media/Images/ranked_emblems/Emblem_MASTER.png';
import grandmaster from '../Media/Images/ranked_emblems/Emblem_GRANDMASTER.png';
import challenger from '../Media/Images/ranked_emblems/Emblem_CHALLENGER.png';
import level1 from '../Media/Images/champion-mastery/level1.png';
import level2 from '../Media/Images/champion-mastery/level2.png';
import level3 from '../Media/Images/champion-mastery/level3.png';
import level4 from '../Media/Images/champion-mastery/level4.png';
import level5 from '../Media/Images/champion-mastery/level5.png';
import level6 from '../Media/Images/champion-mastery/level6.png';
import level7 from '../Media/Images/champion-mastery/level7.png';


class SummonerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getRankedImg = () => {
        let src;
        if (this.props.rank) {
            const tier = this.props.rank.tier;
            switch (tier) {
                case "IRON":
                    src = iron;
                    break;
                case "BRONZE":
                    src = bronze;
                    break;
                case "SILVER":
                    src = silver;
                    break;
                case "GOLD":
                    src = gold;
                    break;
                case "PLATINUM":
                    src = plat;
                    break;
                case "DIAMOND":
                    src = diamond;
                    break;
                case "MASTER":
                    src = master;
                    break;
                case "GRANDMASTER":
                    src = grandmaster;
                    break;
                case "CHALLENGER":
                    src = challenger;
                    break;
                default:
                    src = challenger;
            }
        }
        return src;
    };

    getChampMasteryImg = () => {
        let src;

        if (this.props.champions) {
            const championMastery = this.props.champions.championLevel;
            switch (championMastery) {
                case '1':
                    src = level1;
                    break;
                case '2':
                    src = level2;
                    break;
                case '3':
                    src = level3;
                    break;
                case '4':
                    src = level4;
                    break;
                case '5':
                    src = level5;
                    break;
                case '6':
                    src = level6;
                    break;
                case '7':
                    src = level7;
                    break;
                default:
                    src = level7
            }
        }

        return src;
    };

    render() {
        return(
            <div className="info" style={{opacity: this.props.opacity, zIndex: 10}}>
                <h3>Summoner info for {this.props.name}</h3>
                <div className="summoner-info">
                    <img className="rank" src={this.getRankedImg()} alt=""/>
                    <div className="most-played">
                        <img src={this.getChampMasteryImg(0)} alt=""/>
                    </div>
                </div>
            </div>
        )
    }

}

export default SummonerInfo;