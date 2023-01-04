
import { useState, useEffect } from 'react';
import { Document,Page, pdfjs } from 'react-pdf';
import "./styles.css";

const Sheetdefault = ({ match: { params: { sheetname } } }) => {
  const sourcelink = "http://localhost:9000/testAPI/sheetpdf/" + sheetname.replace(/\s/g, "%20") + "#toolbar=0&navpanes=0"
  const [sheetlist, setSheetlist] = useState([]);
  const callAPI = () => {
    fetch("http://localhost:9000/testAPI/sheets")
      .then(res => res.json())
      .then(res => setSheetlist(res));
  }

  /*let test = "http://localhost:9000/testAPI/sheetpdf/"+sheetname.replace(/\s/g, "%20")
 const [sheetpdf, setSheetpdf] = useState();
  const callAPISheets = () => {
    fetch (test)
    .then(res => res.text())
    .then(res => setSheetpdf(res));
  }
*/

  useEffect(() => {
    callAPI()
    //callAPISheets()
  }, []);

  const sheetIndex = sheetlist.findIndex(obj => obj.name === sheetname);



  const sheetauthor = sheetIndex === -1 ? " " : sheetlist[sheetIndex].author;
  const sheetid = sheetIndex === -1 ? " " : sheetlist[sheetIndex].id;
  const sheetpreview = sheetIndex === -1 ? " " : sheetlist[sheetIndex].preview;
  const sheetlink = sheetIndex === -1 ? " " : sheetlist[sheetIndex].sheetlink;
  const videoLink = sheetIndex === -1 ? " " : sheetlist[sheetIndex].videoLink;
  const sheetnotes = sheetIndex === -1 ? " " : sheetlist[sheetIndex].notes;
  const date = sheetIndex === -1 ? " " : sheetlist[sheetIndex].date;
  const embedLink = "https://www.youtube.com/embed/" + videoLink
  const styles = {
    outercontainer: {
      display: "flex",
      flexDirection: "row",
    },

    innercontainer: {
      display: "flex",
      flexDirection: "column",

      flexDirection: "column",
      fontSize: "18px",
      backgroundColor: "#0a1c57",
      borderRadius: "20px"
    },
    detailtext: {
      flex: '2',
      marginLeft: "20px",

    },
    downloads: {
      flex: "1",
      padding: "1px 20px 20px 20px",
      fontSize: "18px",
      backgroundColor: "#0a1c57",
      borderRadius: "20px",
      marginTop: "40px"
    },
    pdfreader: {
      flex: 7,
      padding: "0px 50px",

      width: "200px"



    },
    sheetdetails: {
      flex: 4,
      padding: "0px 50px",
  


    },
    button: {

      height: "200",
      backgroundColor: "#0a1c57",
      color: "white",
      border: "none",
      outline: "none",
      textAlign: "left",
      borderRadius: "10px"


    },
    outer: {
      backgroundColor: "#31437d",
      height: "100%",
      color: "white",
    },
    title: {
      padding: "0px 54px",
      fontSize: "25px"
    },
    spacer: {
      flex: "1"
    },
    embedCover: {
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
    },
    externalLinks: {

      flex: "1",
      padding: "1px 20px 20px 20px",
      fontSize: "18px",
      backgroundColor: "#0a1c57",
      borderRadius: "20px",
      marginTop: "40px"
    },
    innerNotes: {
      color: "#c2c2c2"
    },
    page: {
      width: "100%",
      backgroundColor: "orange"
    }




  }
  const [page, setPage] = useState(2);

  function bgChanger(e) {
    e.target.style.backgroundColor = "#3297a8";
  }
  function bgRevert(e) {
    e.target.style.backgroundColor = "#0a1c57";
  }
  function disabledownloads() {
    alert("downloads temporarily disabled")
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
//  < embed  src={sourcelink} width="100%" height="790px" frameBorder='0'/>
  return (
    <div style={styles.outer}>
      <div style={styles.title}><p >{sheetname}</p></div>
      <div style={styles.outercontainer} >

        <div style={styles.pdfreader } >
        <div className="App"><div className="all-page-container"><Document file={sourcelink} style={styles.page} onContextMenu={(e) => { 
  e.preventDefault(); 

  return false
}} onLoadSuccess={({ numPages })=>setNumPages(numPages)} options={{ workerSrc: "/pdf.worker.js" }}>
        {Array.apply(null, Array(numPages))
    .map((x, i)=>i+1)
    .map(page => <Page pageNumber={page}/>)}
  </Document></div></div>
        

        </div>

        <div style={styles.sheetdetails}>
          <div style={styles.innercontainer}>
            <div style={styles.detailtext}>
              <p>Author: {sheetauthor}</p>
              <p>Date uploaded: {date}</p>
              <p style={styles.innerNotes}>{sheetnotes}</p>

            </div>



          </div>
          <div style={styles.downloads}>
            <p width="100%">Downloads</p>
            <a /*href="https://sheetmusic.pianoshelf.com/sheetmusic/chopin/etude_op25_no11_winter_wind.pdf" download="testfile" target='_blank'*/  ><button onClick={disabledownloads} style={styles.button}
              onMouseEnter={bgChanger}
              onMouseLeave={bgRevert}>{sheetname.replace(/\s/g, "_")}.pdf</button></a>
          </div>
          <div style={styles.externalLinks}>
            <p>Video</p>
            <iframe width="100%" height="200px" src={embedLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
        <div style={styles.spacer}>

        </div>
      </div>

    </div>

  );
}


export default Sheetdefault;