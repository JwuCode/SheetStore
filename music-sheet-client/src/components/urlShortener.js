const urlShortener = () => {
    const styles = {
        container: {
            backgroundColor: "#a3c0f0",
            height: "92vh",
            display: "flex",
            flexDirection: "row",
            
            
        },
        innercontainer: {
            padding: "100px 100px",
            textAlign: "center",
            fontSize: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex"
            

        },
        inputBar: {

        }
    }
return(
    <div style = {styles.container}>
        
        <div style = {styles.innercontainer}>
        <a>
            URL link changer:
        </a>
        <form>
            <input type="text" id="test" placeholder="URL to be shortened..."/>
            <input type="submit" value="Shorten URL"/>
             </form>
        </div>
        </div>
)
}
export default urlShortener;