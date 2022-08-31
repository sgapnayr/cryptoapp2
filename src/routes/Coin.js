import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useParams } from "react-router-dom";

const Coin = ({ image }) => {
    const [coin, setCoin] = useState({});
    const params = useParams();

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

    async function getData() {
        await axios
            .get(url)
            .then((res) => setCoin(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        <div className="CoinAll">

            <Link to='/'>
                <div className="Link">
                    Go Back
                </div>
            </Link>


            <div className="CoinTitle">
                <h1>
                    {coin.name}
                </h1>
            </div>

            <div className="CoinWrapper">

                <div className="CoinContent">
                    <div className="CoinImage">
                        {coin.image ? <img src={coin.image.small} alt="..." /> : null}
                    </div>
                    <p className="CoinName">{coin.name}</p>
                    <p>({coin.symbol})</p>
                    <div className="CoinRank">
                        Rank # {coin.market_cap_rank}
                    </div>
                    {/* <div className="CoinInfo">
                        {coin.description.en}
                    </div> */}
                </div>
            </div>
            {/* <div className="Content">
            <table>
                <thead>
                    <tr>
                        <th>1h</th>
                        <th>24h</th>
                        <th>7d</th>
                        <th>14d</th>
                        <th>30d</th>
                        <th>1yr</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{coin.market_data.price_change_percentage_1h_in_currency.usd}</td>
                        <td>{coin.market_data.price_change_percentage_24h_in_currency.usd}</td>
                        <td>{coin.market_data.price_change_percentage_7d_in_currency.usd}</td>
                        <td>{coin.market_data.price_change_percentage_14d_in_currency.usd}</td>
                        <td>{coin.market_data.price_change_percentage_30d_in_currency.usd}</td>
                        <td>{coin.market_data.price_change_percentage_1y_in_currency.usd}</td>
                    </tr>
                </tbody>
            </table>
        </div> */}
            {/* <div className="content">
            <div className="stats">
                <div className="left">
                    <div className="row">
                        <h4>24 Hour Low</h4>
                        <p>{coin.market_data.low_24h.usd}</p>
                    </div>
                    <div className="row">
                        <h4>24 Hour High</h4>
                        <p>{coin.market_data.high_24h.usd}</p>
                    </div>
                </div>
                <div className="right">
                    <div className="row">
                        <h4>Market Cap</h4>
                        <p>{coin.market_data.market_cap.usd}</p>
                    </div>
                    <div className="row">
                        <h4>Circulating Supply</h4>
                        <p>{coin.market_data.circulating_supply.usd}</p>
                    </div>
                </div>
                <div className="content">
                    <div className="about">
                        <h3>About</h3>
                        <p>{coin.description.en}</p>
                    </div>
                </div>
            </div>
        </div> */}
        </div>
    </>;
};

export default Coin;
