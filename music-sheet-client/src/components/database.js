
import React, { useEffect } from 'react'
import { useState, } from 'react';
import { Link, } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';



const Table = ({ data, }) => {

  const calculateRange = Math.ceil(data.length / 10);






  const [page, setPage] = useState(1)





  const dataToDisplay = data.slice((page - 1) * 10, page * 10);

  const handleChangePage = (event, newpage) => {
    setPage(newpage);
  };

  function textChanger(e) {
    e.target.style.color = "#33f2ac";
  }
  const [namesort, nameOrder] = useState("descending");
  function nameSort() {
    if (namesort === "descending") {
      data.sort((e1, e2) => {
        return e1.name.localeCompare(e2.name);
      }).map(e => e);

      nameOrder("ascending")
      setNameText("Name ↑")
    }
    if (namesort === "ascending") {
      data.sort((e1, e2) => {
        return e2.name.localeCompare(e1.name);
      }).map(e => e);

      nameOrder("descending")

      setNameText("Name ↓")
    }

  }
  const [authorsort, authorOrder] = useState("descending");
  function authorSort() {
    if (authorsort === "descending") {
      data.sort((e1, e2) => {
        return e1.author.localeCompare(e2.author);
      }).map(e => e);

      authorOrder("ascending")
      setAuthorText("Author ↑")

    }
    if (authorsort === "ascending") {
      data.sort((e1, e2) => {
        return e2.author.localeCompare(e1.author);
      }).map(e => e);

      authorOrder("descending")
      setAuthorText("Author ↓")

    }

  }

  function textRevert(e) {
    e.target.style.color = "#ffffff";
  }
  const tablestyles = {
    tablelink: {
      textDecoration: 'none',
      color: "white",
    },
    tablecontainer: {
      display: "flex"
    },
    cover: {
      flex: "2"
    },
    name: {
      flex: "4"
    },
    author: {
      flex: "2"
    },
    table: {
      backgroundColor: "#0a1c57",
      borderRadius: "20px",
      padding: "20px",
      margin: "20px"
    },
    sorterbuttons: {
      backgroundColor: "#0a1c57",
      width: "100%",
      fontSize: "18px",
      color: "white",
      border: "none",
      outline: "none",
      marginBottom: "15px",
      textAlign: "left",
    },
    sheetcover: {
      alignContent: "center",
      width: "75%",
      backgroundColor: "#33528c",
      padding: "10px 5px",
      borderRadius: "10px"
    },
    tablerow: {
      textAlign: "left",
      verticalAlign: "top",
      paddingBottom: "40px"
    },
    notes: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#c2c2c2"
    },
    paginator: {
      backgroundColor: "white",
      color: "#0a1c57"

    },
    paginatorcontainer: {
      display: "flex",
      justifyContent: "center",


    }


  };


  const [nameText, setNameText] = React.useState("Name");
  function namedisplay() {
    if (namesort === "descending") {
      setNameText("Name ↓")
    }
    if (namesort === "ascending") {
      setNameText("Name ↑")
    }

  }
  function namerevert() {
    setNameText("Name")
  }
  const [authorText, setAuthorText] = React.useState("Author");
  function authordisplay() {
    if (authorsort === "descending") {
      setAuthorText("Author ↓")
    }
    if (authorsort === "ascending") {
      setAuthorText("Author ↑")
    }
  }

  function authorrevert() {
    setAuthorText("Author")
  }
  return (
    <div style={tablestyles.table}>
      <table >
        <tbody >
          <tr>
            <th></th>
            <th><button style={tablestyles.sorterbuttons} onClick={nameSort} onMouseEnter={namedisplay} onMouseLeave={namerevert}>{nameText}</button></th>
            <th><button style={tablestyles.sorterbuttons} onClick={authorSort} onMouseEnter={authordisplay} onMouseLeave={authorrevert}>{authorText}</button></th>
            <th><button style={tablestyles.sorterbuttons} onClick={console.log(data)}>Release Date (MM/DD/YYYY)</button></th>
          </tr>
          {dataToDisplay.map(({ id, name, preview, author, notes, date }) => (
            <tr key={id}>
              <td width="15%" style={tablestyles.tablerow}><img src={preview} height="100%" alt="Not loaded." onError={event => {
          event.target.src = "https://cdn-icons-png.flaticon.com/512/1693/1693325.png"
          event.onerror = null
        }}
        style={tablestyles.sheetcover}></img></td>
              <td width="40%" style={tablestyles.tablerow}>
                <Link to={`/database/${name}`} style={tablestyles.tablelink}
                ><div onMouseEnter={textChanger}
                  onMouseLeave={textRevert}>{name}</div><div style={tablestyles.notes}>{notes}</div></Link>
              </td>
              <td width="25%" style={tablestyles.tablerow}>{author}</td>
              <td width="20%" style={tablestyles.tablerow}> {date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={tablestyles.paginatorcontainer}>
        <Pagination sx={{
          backgroundColor: "#0a1c57",
          '& .MuiPaginationItem-text': {
            color: "white",

          },
          '& .Mui-selected': {
            color: "#247cff"
          },

          '& .MuiPaginationItem-button': {
            disableRipple: "true",
          }


        }} count={calculateRange} onChange={handleChangePage} siblingCount={1} boundarycount={1} showFirstButton showLastButton />
      </div></div>
  )
};



const Database = () => {

  const [sheets, setSheets] = useState([]);
  const [searchInput, setSearchInput] = useState(undefined);


  const filteredSheets = sheets.filter(sheet => {

    if (searchInput) {
      return (
        sheet.name.toLowerCase().indexOf(searchInput) !== -1 ||
        sheet.author.toLowerCase().indexOf(searchInput) !== -1
      );
    }
    return true;
  });

/*https://musicsheetapi.azurewebsites.net/testAPI/sheets */
/*http://localhost:9000/testAPI/sheets*/
  const callAPI = () => {
    fetch("http://localhost:9000/testAPI/sheets")
      .then(res => res.json())
      .then(res => setSheets(res));
  }


  useEffect(() => {
    callAPI()
  }, []);



  const styles = {
    
    listcontainer: {
      flex: "5",

    },
    outercontainer: {
      display: "flex",
      flexDirection: "row",



    },
    tagcontainer: {
      flex: "3",
    },
    searchbar: {
      padding: "20px",
      marginLeft: "20px",
      marginRight: "20px",
      backgroundColor: "#33528c",
      borderRadius: "30px",
      marginTop: "30px"

    },
    inputstyle: {
      width: `calc(100% - 20px)`,
      height: "40px",
      borderRadius: "10px",
      padding: " 0px 10px",
      border: "none",
      outline: "none",
    },
    test: {
      height: "100%",
      minHeight: "100vh"
    },
    info: {
      padding: "10px",
      backgroundColor: "#0a1c57",
      borderRadius: "20px",
      marginTop: "30px",
      marginLeft: "20px",
      marginRight: "20px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "18px",
      marginLeft: "20px"
    },
    description: {
      marginLeft: "20px",
      marginRight: "20px"
    },
    list: {
      color: "white",
      paddingLeft: "0px",

      marginLeft: "20px",
      fontWeight: "normal",
    },
    link: {
      color: "white",
      textDecoration: "none",
      height: "40px"
      
    }
  }


  return (
    <div style={styles.test}>
      <div style={styles.outercontainer}>
        <div style={styles.listcontainer}>
          <div style={styles.searchbar}><form ><input style={styles.inputstyle} type="text" onKeyUp={(e) => { setSearchInput(e.target.value.toLowerCase()) }} placeholder="Search for sheets..." /></form></div>
          <div>
            <Table data={filteredSheets} />
          </div>
        </div>
        <div style={styles.tagcontainer}>
          <div style={styles.info}>
            <p style={styles.title}>SheetStore</p>
            <p style={styles.description}> I created this website to store my sheets, and make it easy to search and preview. Right now, the music genres in the music sheets is a little sparse, so as I add more sheets, I will eventually add tags and more filter functionality</p>
            </div>
            <div style={styles.info}>
              <p style={styles.title}> Current Favorite Youtubers</p>
              <p style={styles.description}> Here are some of my favorite arrangers:
              <ul style={styles.list}>
  <li><a style={styles.link} href="https://www.youtube.com/@fruitanimeonpiano">Fruit</a></li>
  <li><a style={styles.link} href="https://www.youtube.com/@Animenzzz">Animenz</a></li>
  <li><a style={styles.link} href="https://www.youtube.com/@Jumpny2010">Jumpny2010</a></li>
</ul>
              </p>
            </div>
        
          
        </div>
      </div>
    </div>
  );
};

const root = document.querySelector('#root');

export default Database;
