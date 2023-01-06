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
const Stockgame = () => {

  const [money, setMoney] = useState(localStorage.getItem('money'))
  const [amountToSell, setAmountToSell] = React.useState("")
  const [stockToSell, setStockToSell] = React.useState("")
  const [allStocks, setAllStocks] = useState([])
  const [stockToPurchase, setStockToPurchase] = useState("")
  const [amountBuying, setAmountToBuy] = useState(1)
  const [stocksList, addStock] = useState([])
  const [stocks, setStocks] = useState([]);

  var gfg = document.getElementById("showDialog");
  const handleClickOpen = () => {
    setStockToSell("")
    setAmountToSell("")
    gfg.show();
  };

  const handleClose = () => {
    gfg.close();
  };


  const Clock = () => {
    const [date, setDate] = useState(new Date());

    if (date.getSeconds() === 61 || date.getSeconds() === 61) {
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
      date.getSeconds()
    );
  }

  const callAPI = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/api/stocks/list?names=" + localStorage.getItem('stocks')
    ).then((response) => response.json())


    setStocks(response);




  };

  const getStocks = async () => {
    const listall = await fetch(
      "http://127.0.0.1:5000/api/stocks/all"
    ).then((listall) => listall.json());

    setAllStocks(listall);

  };
  function stockExists(array, name) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] != name) {
        return false;
      }
    }
    return true;
  }


  async function purchaseStock() {
    if (stockToPurchase != ""){
      setStockToPurchase(stockToPurchase.toUpperCase())
      var money = parseFloat(localStorage.getItem('money'))
      var oldList = localStorage.getItem('stocks')
      if (parseFloat(localStorage.getItem(stockToPurchase)) != null) {
        var amountOwned = parseFloat(localStorage.getItem(stockToPurchase))
      } else {
        var amountOwned = 0.0;
      }
  
  
  
      if (oldList === null) {
        oldList = "";
      }
      if (stockExists(oldList.split(","), stockToPurchase.toUpperCase())) {
        localStorage.setItem(stockToPurchase.toUpperCase(), String(amountOwned + parseFloat(amountBuying)))
        callAPI()
  
        var price = parseFloat(stocks.filter(stock => stock.name === stockToPurchase)[0]['currentPrice'])
        localStorage.setItem('money', String((money - (price * parseFloat(amountBuying))).toFixed(2)))
  
      } else if (oldList === "") {
        oldList = stockToPurchase.toUpperCase();
        localStorage.setItem('stocks', oldList);
        localStorage.setItem(stockToPurchase.toUpperCase(), amountBuying)
        callAPI();
  
        var price = await fetch(
          "http://127.0.0.1:5000/api/stocks/list?names=" + stockToPurchase
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
          "http://127.0.0.1:5000/api/stocks/list?names=" + stockToPurchase
        ).then((price) => price.json())
        price = parseFloat(price[0]['currentPrice'])
        localStorage.setItem('money', String((money - (price * parseFloat(amountBuying))).toFixed(2)))
      }
    }
    
  }

  function sellStock() {


    var money = parseFloat(localStorage.getItem('money'))
    var price = parseFloat(stocks.filter(stock => stock.name === stockToSell)[0]['currentPrice'])
    var amount = parseFloat(amountToSell)
    var amountOwned = parseFloat(localStorage.getItem(stockToSell))
    var currentOwned = localStorage.getItem('stocks').split(',')
    if (amount === amountOwned) {
      currentOwned.splice(currentOwned.indexOf(stockToSell), 1)
    }
    else {
      localStorage.setItem(stockToSell, amountOwned - amount)
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
    var myItem = localStorage.getItem('money');
    localStorage.clear();
    localStorage.setItem('money', myItem);

    setStocks([{ name: "none", currentPrice: "0", afterhoursPrice: "0" }])
  }

  useEffect(() => {

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
      width: "100px"
    },
    container: {
      display: "flex",
      flexDirection: "row",
      height: '100vh',
      backgroundColor: "black"

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
      height: "400px",
      width: "50%",
      padding: "20px 25px",
      borderRadius: "20px",
      backgroundColor: "#2f1b61",
      marginTop: " 20px",
      marginRight: " 40px",
      marginLeft: " 40px",

    },
    buymenu: {
      marginTop: "30px",
      padding: "0px",
      fontSize: "15px"

    },
    purchaseButton: {
      width: "100px",
      height: "50px",
      backgroundColor: "red"
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
            <p >Stock to Purchase</p>
            <input
              type="text"
              value={stockToPurchase}
              onChange={(e) => setStockToPurchase(e.target.value)}
            />

            <span></span>
            <p>Amount to Purchase</p>
            <input
              type="text"
              value={amountBuying}
              onChange={(d) => setAmountToBuy(d.target.value)}
            />
            <button type="button" styles={styles.purchaseButton} onClick={purchaseStock}>Purchase</button>
          </div>


        </div></div>
      <div><Clock /></div>
      <div>        <button onClick={handleClickOpen}>
        Sell
      </button>
        <button style={styles.button} onClick={clearStocks}>CLEAR</button>
        <dialog id="showDialog" >
          Sell Stock

          <input
            type="text"
            value={stockToSell}
            onChange={(x) => setStockToSell(x.target.value)}
          />
          <button onClick={handleClose}>close</button>
          <br></br>
          <input
            type="text"
            value={amountToSell}
            onChange={(g) => setAmountToSell(g.target.value)}
          />
          <button onClick={sellStock}>submit</button> </dialog></div>

      <div>{localStorage.getItem('money')}
        <button onClick={resetmoney}>reset money</button>
        <button onClick={addmoney}>add 500 money</button>
      </div>
      <div ></div>
    </div>
  )
}



export default Stockgame