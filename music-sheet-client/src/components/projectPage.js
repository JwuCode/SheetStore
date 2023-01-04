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
            flex: "4"
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
        }
    }
return(
    <div style={styles.container}>
        <div style={styles.project}>
            <div style={styles.title}>Social Credit Discord Bot</div>
            <div style={styles.details}>A discord bot that tracks social credit, and will reduce or add depending on what users say. Additionally contains Super Idol, Bing Chilling, and Eggman functions</div>
            <div style={styles.statusNo}>Status: In Progress</div>
             </div>
             <div style={styles.project}>
            <div style={styles.title}>Piano Sheet Database</div>
            <div style={styles.details}>An archive for piano sheet music, with sorting and search functions. Made with React JS and Express API, can be found in navigation bar.</div>
            <div style={styles.statusNo}>Status: In Progress</div>
             </div>
             <div style={styles.spacer}></div>
    </div>

);
}
export default projects