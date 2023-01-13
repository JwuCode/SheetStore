import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './scrollbar.css'
import { fontSize } from '@mui/system';
const Stockgame = () => {
  
  const [money, setMoney] = useState(localStorage.getItem('money'))
  const [amountToSell, setAmountToSell] = useState(1)
  const [stockToSell, setStockToSell] = useState("")
  const [allStocks, setAllStocks] = useState([])
  const [stockToPurchase, setStockToPurchase] = useState("")
  const [amountBuying, setAmountToBuy] = useState(1)
  const [stocksList, addStock] = useState([])
  const [stocks, setStocks] = useState([])
  const [netPortfolio, setValue] = useState("0")

  var gfg = document.getElementById("showDialog");
  var info = document.getElementById("showInfo");
  const handleHoverOpen = () => {
    info.show();
  }
  const handleHoverClose = () => {
    info.close();
  }
  const handleClickOpen = () => {
    setStockToSell("")
    setAmountToSell(1)
    gfg.show();
  };

  const handleClose = () => {
    gfg.close();
  };

  const Clock = () => {
    const clockStyle = {
      clock: {
        color: "#4d2d9f",
        position: "absolute",
        right: "30px",
        bottom: "30px"
      }
    }
    const [date, setDate] = useState(new Date());

    if (date.getSeconds() === 1 || date.getSeconds() === 31) {
      if (localStorage.getItem('stocks') != null) {
        callAPI()
      }
    }
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
      
    }, []);
    return (
      <p style={clockStyle.clock}>{date.getSeconds()}</p>
      
    );
  }

  const callAPI = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/api/stocks/list?names=" + localStorage.getItem('stocks')
      
    ).then((response) => response.json())

      
    setStocks(response);

    if ((localStorage.getItem('stocks') != null)) {
      var totalvalue = 0;
      var list = localStorage.getItem('stocks').split(',')

      for (let b = 0; b < list.length; b++) {
        var tempPrice = await fetch(
          "http://127.0.0.1:5000/api/stocks/list?names=" + list[b].toUpperCase()
        ).then((tempPrice) => tempPrice.json())
        tempPrice = parseFloat(tempPrice[0]['currentPrice'])
            
        totalvalue += ((parseFloat(localStorage.getItem(list[b].toUpperCase())) * parseFloat(tempPrice)))

      }
      setValue(totalvalue.toFixed(2))
    }



  };

  const getStocks = async () => {
    const listall = await fetch(
      "http://127.0.0.1:5000/api/stocks/all"
    ).then((listall) => listall.json());

    setAllStocks(listall);

  };
  function stockExists(array, name) {
    for (let i = 0; i < array.length; i++) {
      if (String(array[i]) === String(name)) {
        return true;
      }
    }
    return false;
  }


  async function purchaseStock() {
    if (stockToPurchase != "") {
      setStockToPurchase(stockToPurchase.toUpperCase())
      var money = parseFloat(localStorage.getItem('money'))
      var oldList = localStorage.getItem('stocks')
      if (parseFloat(localStorage.getItem(stockToPurchase.toUpperCase())) != null) {
        var amountOwned = parseFloat(localStorage.getItem(stockToPurchase.toUpperCase()))
      } else {
        var amountOwned = 0.0;
      }

      if (oldList === null) {
        oldList = "";
      }
      if (stockExists(oldList.split(","), stockToPurchase.toUpperCase())) {
        localStorage.setItem(stockToPurchase.toUpperCase(), (amountOwned + parseFloat(amountBuying)))

        var price = parseFloat(stocks.filter(stock => stock.name === stockToPurchase.toUpperCase())[0]['currentPrice'])
        localStorage.setItem('money', String((money - (price * parseFloat(amountBuying))).toFixed(2)))
        callAPI()

      } else if (oldList === "") {
        oldList = stockToPurchase.toUpperCase();
        localStorage.setItem('stocks', oldList);
        localStorage.setItem(stockToPurchase.toUpperCase(), amountBuying)
        callAPI();

        var price = await fetch(
          "http://127.0.0.1:5000/api/stocks/list?names=" + stockToPurchase.toUpperCase()
        ).then((price) => price.json())
        price = parseFloat(price[0]['currentPrice'])
        localStorage.setItem('money', String((money - (price * parseFloat(amountBuying))).toFixed(2)))

      }
      else {
        oldList = oldList + ","
        localStorage.setItem('stocks', oldList + stockToPurchase.toUpperCase());
        localStorage.setItem(stockToPurchase.toUpperCase(), amountBuying)
        callAPI();

        var price = await fetch(
          "http://127.0.0.1:5000/api/stocks/list?names=" + stockToPurchase.toUpperCase()
        ).then((price) => price.json())
        price = parseFloat(price[0]['currentPrice'])
        localStorage.setItem('money', String((money - (price * parseFloat(amountBuying))).toFixed(2)))
      }
    }

  }

  async function sellStock() {
    setStockToSell(stockToSell.toUpperCase())
    var money = parseFloat(localStorage.getItem('money'))
    var price = await fetch(
      "http://127.0.0.1:5000/api/stocks/list?names=" + stockToSell.toUpperCase()
    ).then((price) => price.json())
    price = parseFloat(price[0]['currentPrice'])
    var amount = parseFloat(amountToSell)
    var amountOwned = parseFloat(localStorage.getItem(stockToSell.toUpperCase()))
    var currentOwned = localStorage.getItem('stocks').split(',')
    if (amount === amountOwned) {
      if (currentOwned.length === 1) {
        localStorage.removeItem('stocks')
      } else {
        currentOwned.splice(currentOwned.indexOf(stockToSell.toUpperCase()), 1)
        localStorage.setItem('stocks', currentOwned.toString())
      }
      
      localStorage.removeItem(stockToSell.toUpperCase())
      setStocks([{ name: "none", currentPrice: "0", afterhoursPrice: "0", }])
      localStorage.setItem('money', String((money + (amount * price)).toFixed(2)))

      callAPI()
    }
    else if (amount > amountOwned){

    } else {
      localStorage.setItem(stockToSell.toUpperCase(), amountOwned - amount)
      localStorage.setItem('money', String((money + (amount * price)).toFixed(2)))
      callAPI()
    }

    }


  

  function addmoney() {
    var oldmoney = localStorage.getItem('money')
    localStorage.setItem('money', parseInt(oldmoney) + 500)
    setMoney(localStorage.getItem('money'))
  }
  function resetmoney() {
    localStorage.setItem('money', 1000000)
    setMoney(localStorage.getItem('money'))

  }
  function clearStocks() {
    var oldHighscore = localStorage.getItem('highscore')
    var oldMoney = String((parseFloat(localStorage.getItem('money')) + parseFloat(netPortfolio)))
    localStorage.clear();
    localStorage.setItem('money', 1000000);
    if (parseFloat(oldHighscore) < parseFloat(oldMoney)) {
      localStorage.setItem('highscore', oldMoney)
    } else {
      localStorage.setItem('highscore', oldHighscore)
    }
    setStocks([{ name: "none", currentPrice: "0", afterhoursPrice: "0" }])
  }
async function priceFetch(name) {
  var price = await fetch(
    "http://127.0.0.1:5000/api/stocks/list?names=" + name.toUpperCase()
  ).then((price) => price.json())
  price = parseFloat(price[0]['currentPrice'])
  return price
}

  useEffect(() => {

    if (localStorage.getItem('highscore') === null) {
      localStorage.setItem('highscore', 0)
    }
    getStocks()
    addStock((localStorage.getItem('stocks')));
    if (localStorage.getItem('money') === null) {
      localStorage.setItem('money', 1000000)
    }
    if (localStorage.getItem('stocks') != null) {

      callAPI();
    } else {

      setStocks([{ name: "none", currentPrice: "0", afterhoursPrice: "0", }])

    }

  }, []);


  const styles = {
    button: {
      fontSize: "20px",
      height: "50px",
      width: "180px",
      marginLeft: "30px",
      marginTop: '15px',
      marginBottom: '20px'
    },
    container: {
      display: "flex",
      flexDirection: "row",
      height: '100vh',
      backgroundColor: "#4d2d9f"

    },
    colm: {
      display: 'flex',
      flexDirection: "column"
    },
    sellDialog: {
      justifyContent: "flexEnd"
    },
    personalStocks: {
      height: "600px",
      display: "inline",
      width: '95%',
      overflow: "scroll",
      overflowX: "auto",
      overflowY: "auto",
      backgroundColor: "#2f1b61",
      padding: "20px 25px",
      borderRadius: "20px",
      marginRight: " 40px",
      marginLeft: " 40px",
      marginTop: " 20px",
      marginBottom: " 20px",
      borderSpacing: "1px 0"

    },

    thead: {
      textAlign: "center",
      margin: "auto",
      fontSize: "20px"


    },
    menu: {
      height: "330px",
      width: "50%",
      padding: "20px 25px",
      borderRadius: "20px",
      backgroundColor: "#2f1b61",
      marginTop: " 20px",
      marginRight: " 0px",
      marginLeft: " 50px",

    },
    buymenu: {
      marginTop: "30px",
      padding: "0px",
      fontSize: "15px"

    },
    purchaseButton: {
      width: "100px",
      height: "30px",
      marginLeft: "20px",
      marginTop: "20px"


    },
    stats: {
      height: "390px",
      padding: "20px 25px",
      borderRadius: "20px",
      backgroundColor: "#2f1b61",
      marginTop: " 20px",
      marginRight: " 40px",
      width: "240px"

    },
    sellButton: {
      width: "110px",
      height: "50px",
      marginLeft: "15px",
      marginTop: "30px"
    },
    sellMenu: {
      height: "270px",
      bottom: "320px",
      position: "absolute",
      borderRadius: "5px",
      width: "160px"
    },
    sellMenuButton: {
      width: "100px",
      height: "30px",
      marginTop: "20px",
      marginLeft: "25px"
    },
    hoverButton: {

      position: "relative",
      width: "20px",
      height: "20px", 
      marginLeft: "50%",
      bottom: "35px",
      left: "90px"
    },
    highscore: {

    },
    scoreinfo: {
      position: "absolute",
      color: "white",
      backgroundColor: "black",
      border: "none",
      padding: "0px",
      left: "1100px",
      top: "250px",
      textAlign: "center",
      borderRadius: "20px",
      height: "55px",
      width: "250px"

    },
    adminTitle: {
      textAlign: "center",
      margin: "auto",
      fontSize: "17px"
    },
    alignment: {
      justifyContent: "center",
  alignItems: "center"
    },
  }



  return (
    <div style={styles.container} >
      <div style={styles.colm}>
        <table id="style-2" style={styles.personalStocks}>
          <caption style={styles.thead}>My Portfolio</caption>
          <tbody>

            <tr >
              <th >Name</th>
              <th>Current Price</th>
              <th>Afterhours Price</th>
              <th>Currently Owned</th>
              <th>Value</th>
            </tr>
            {stocks.map(({ name, currentPrice, afterhoursPrice }) => (
              <tr key={name} >
                <td>{name}</td>
                <td>{currentPrice}</td>
                <td>{afterhoursPrice}</td>
                <td>{localStorage.getItem(name)}</td>
                <td>{(parseFloat(localStorage.getItem(name)) * parseFloat(currentPrice)).toFixed(2)}</td>

              </tr>
            ))}</tbody>
        </table></div>


      <div style={styles.colm}>
        <div style={styles.menu}>
          <p style={styles.thead}>Buy/Sell Menu</p>
          <div style={styles.buymenu}>
            <p >Stock to Purchase (Stock Codes Only)</p>
            <input
              type="text"
              value={stockToPurchase}
              onChange={(e) => setStockToPurchase(e.target.value)}
            />
            <p>Amount to Purchase</p>
            <input
              type="text"
              value={amountBuying}
              onChange={(d) => setAmountToBuy(d.target.value)}
            />
            <button type="button" style={styles.purchaseButton} onClick={purchaseStock}>Purchase</button>
            <div>       
               <button onClick={handleClickOpen} style={styles.sellButton}>
               Open Sell Interface
            </button >

              <dialog id="showDialog" style={styles.sellMenu}>
                
              <p style={styles.thead}>Sell Interface</p>
              <p>Stock To Sell:</p>
                <input
                  type="text"
                  value={stockToSell}
                  onChange={(x) => setStockToSell(x.target.value)}
                />
                <p>Amount To Sell:</p>
               
                <input
                  type="text"
                  value={amountToSell}
                  onChange={(g) => setAmountToSell(g.target.value)}
                />
                <button onClick={sellStock} style={styles.sellMenuButton}>Submit</button> 
                <button onClick={handleClose}  style={styles.sellMenuButton}>Close</button></dialog></div>
          </div>
        </div>
      </div>
      <div style={styles.colm}>
        <div style={styles.stats}>
        <p style={styles.thead}>Stats/Admin</p>
          <div><p>Money: {localStorage.getItem('money')}</p>
          <p>Current Portfolio Value: {netPortfolio}</p>
          <div ><p style={styles.highscore}>Highscore: {localStorage.getItem('highscore')}</p>
             <img src="https://cdn-icons-png.flaticon.com/512/71/71768.png" style={styles.hoverButton} onMouseEnter={handleHoverOpen}
            onMouseLeave={handleHoverClose}/>
          </div>
            <dialog id="showInfo" style={styles.scoreinfo}><p>Highscore saved on game reset</p></dialog>
            <p style={styles.adminTitle}>Options</p>
            <div style={styles.alignment}><button style={styles.button} onClick={clearStocks}>Reset Game</button></div>
            <p style={styles.adminTitle}>Info</p>
            <p>All stock information is scraped from YahooFinance. Stock display will automatically refresh every 30 seconds.</p>
            <Clock style={styles.clock}/>
          </div>
        </div>
      </div>

      <div ></div>
    </div>
  )
}



export default Stockgame
