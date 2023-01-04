
import './playground.css'
const playground = () => {
   
    const styles = {
        container: {
            height: "100vh",
            backgroundColor: "#1fc2bc",
            display: "flex",
            flexDirection: "row",
            
        },
        title:{
            padding: "50px",

        },
        project: {
            padding: "20px",

            
            display:"flex",
            flexDirection:"column",
            flex: "2",
            
            alignItems: "row",
            color: "#8a9c91"
            
        },
        information: {
            padding: "30px",

            backgroundColor: "#247d7a",
            display:"flex",
            flexDirection:"row",
            flex: "1",
        },
        spacer: {
            flex: "4"
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
        <div style = {styles.information}>
<h1>Here's where I test some side projects that I'm doing:</h1>

        </div>
        <div style = {styles.project}>
     <a href="http://localhost:3000/URLchanger">URL changer</a>
     <a href="http://localhost:3000/stockgame">stock game</a></div>
    </div>

);
}
export default playground