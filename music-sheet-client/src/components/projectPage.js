const projects = () => {
    const styles = {
        container: {
            height: "100vh",
            backgroundColor: "#31437d",
            display: "flex",
            flexDirection: "row",
            padding: "50px"
        },
        project: {
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "#0a1c57",
            display:"flex",
            flexDirection:"column",
            flex: "1",
            height: "35vh",
            alignItems: "center",
            marginLeft: "30px"
        },
        spacer: {
            flex: "2"
        },
        title: {
            fontSize:"18px"

        },
        details: {
            textAlign: "center",
            marginTop: "20px",
            fontSize:"16px"

        },
        statusNo: {
            marginTop: "20px",
            fontSize:"16px",
            color: "red"
        },
        statusYes: {
            marginTop: "20px",
            fontSize:"16px",
            color: "green"
        },
        link: {
            textDecoration: "none",
            color: "#85b4ed",
            marginTop: "5px"
        }
    }
return(
    <div style={styles.container}>
        <div style={styles.project}>
            <div style={styles.title}>Credit Discord Bot</div>
            <div style={styles.details}>A discord bot that tracks social credit, and will reduce or add depending on what users say. Additionally contains Super Idol, Bing Chilling, and Eggman functions</div>
            <div style={styles.statusNo}>Status: In Progress</div>
             </div>
             <div style={styles.project}>
            <div style={styles.title}>Piano Sheet Database</div>
            <div style={styles.details}>An archive for piano sheet music, with sorting and search functions. Made with React JS and Express API, can be found in navigation bar.</div>
            <div style={styles.statusYes}>Status: Deployed</div>
            <a style={styles.link} href="http://localhost:3000/database">Click To Visit!</a>
             </div>
             <div style={styles.project}>
            <div style={styles.title}>Stock Game</div>
            <div style={styles.details}>A game that simulates stock trading, with standard buy/sell actions. Stock prices are scraped from Yahoo Finance with a BeautifulSoup4 webscraper, and a flask server passes the prices to the React JS frontend</div>
            <div style={styles.statusYes}>Status: Deployed</div>
            <a style={styles.link} href="http://localhost:3000/stockgame">Click To Visit!</a>
             </div>
             <div style={styles.project}>
            <div style={styles.title}>Air Pollution Monitor</div>
            <div style={styles.details}>Code that runs on the STM32F401 Microcontroller to monitor PM2.5 concentration in the air with the PMS9000 sensor. Project is purely coded in C++.</div>
            <div style={styles.statusYes}>Status: Complete</div>
            <a style={styles.link} href="https://github.com/JwuCode/AirQualityMonitor">Click To Visit!</a>
             </div>
             <div style={styles.spacer}></div>
    </div>

);
}
export default projects