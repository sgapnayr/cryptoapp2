import { useState } from 'react'
import axios from 'axios'
import { AppHeader, Border, BorderHeader, BordersAround, BorderLeft, SideBorders, BorderRight, Charts, CoinCharts, CoinTable, ListHeader, StyledForm, StyledInput, CoinHeader, CoinList, CoinContainer, CoinDiv } from './components/app.styles'
import { Routes, Route, Link } from 'react-router-dom';
import Coin from './routes/Coin'
import BarChart from './charts/Chart'
import APPTITLE from './components/APPTITLE';
import LISTHEADER from './components/LISTHEADER';
import COINHEADER from './components/COINHEADER';

const LIST = ({ filteredCoinList, coins, symbol }) => {
  return (
    <CoinList>
      {coins && filteredCoinList?.map(coin => {
        return (
          <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
            <CoinContainer key={coin.id}>
              <CoinDiv>
                {coins.indexOf(coin) + 1}
              </CoinDiv>
              <CoinDiv>
                <img src={coin.image} alt="Crypto" />
              </CoinDiv>
              <CoinDiv>
                {coin.name}
              </CoinDiv>
              <CoinDiv>
                ({coin.symbol.toUpperCase()})
              </CoinDiv>
              <CoinDiv>
                <h4>
                  {symbol}
                  {coin.current_price.toLocaleString()}
                </h4>
              </CoinDiv>
              <CoinDiv>
                <div className={coin.price_change_percentage_24h > 0 ? 'green' : 'red'} >
                  {coin.price_change_percentage_24h?.toFixed(2)} %
                </div>
              </CoinDiv>
            </CoinContainer>
          </Link>
        )
      })}
    </CoinList>
  )
}

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [isSorted, setSort] = useState(null)
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`

  axios.get(url).then(res => setCoins(res.data))

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSymbol = (currency) => {
    if (currency === "usd") {
      setSymbol("$");
    }
    if (currency === "eur") {
      setSymbol("€");
    }
    if (currency === "jpy") {
      setSymbol("¥");
    }
    if (currency === "btc") {
      setSymbol("₿");
    }
    if (currency === "eth") {
      setSymbol("Ξ");
    }
  };

  const handleChangeCurrency = (e) => {
    const { value } = e.target;
    setCurrency(value.toLowerCase());
    handleSymbol(value.toLowerCase());
  };

  const handleSort = () => {
    switch (isSorted) {
      case null:
        setSort(false);
        break;
      case false:
        setSort(true);
        break;
      case true:
        setSort(null);
        break;
      default:
        setSort(null);
        break;
    }
  };

  const filteredCoinList = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  const renderList = () => {
    if (isSorted === true) {
      return filteredCoinList.sort((a, b) => a.current_price - b.current_price);
    } else if (isSorted === false) {
      return filteredCoinList.sort((b, a) => a.current_price - b.current_price);
    } else {
      return filteredCoinList.sort();
    }
  };

  const pathname = window.location.pathname

  return (

    <div className="App">
      <Border>
        <BorderHeader>
          <AppHeader>
            <APPTITLE></APPTITLE>
          </AppHeader>
        </BorderHeader>
      </Border>
      <BordersAround>
        <CoinCharts>
          <Charts>
            <BarChart />
          </Charts>
        </CoinCharts>
        <SideBorders>
          <BorderLeft />
          <CoinTable>
            {pathname === '/' ?
              <LISTHEADER value={search} />
              : ''}
            {pathname === '/' ?
              <StyledForm>
                <StyledInput onChange={handleChange} placeholder='Search Crypto Here...' />
              </StyledForm>
              : ''}
            {pathname === '/' ?
              <select onChange={handleChangeCurrency}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
              : ''}
            {pathname === '/' ?
              <COINHEADER handleSort={handleSort} isSorted={isSorted} />
              : ''}
            <Routes>
              <Route path='/' element={<LIST filteredCoinList={renderList()} coins={coins} symbol={symbol} />} />
              <Route path='/coin' element={<Coin />}>
                <Route path=':coinId' element={<Coin />} />
              </Route>
            </Routes>
          </CoinTable>
          <BorderRight />
        </SideBorders>
      </BordersAround>
      <Border>
        <div className="border-footer"></div>
      </Border>
    </div>
  );
}

export default App; 