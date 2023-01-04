class Table extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
           sheets: [
              { preview: "https://sheet.host/https://sheet.host/sheet/3wj0T6/image", name: 'e', author: "Name6"},
              { preview: "./imgs/music_sheet.png", name: 'g', author: "Name2"},
              { preview: "./imgs/music_sheet.png", name: 'b', author: "Name3"},
              { preview: "./imgs/music_sheet.png", name: 'd', author: "Name4"},
              { preview: "./imgs/music_sheet.png", name: 'k', author: "Name5"}
           ]
           
        }
        
     }
     
     renderTableHeader() {
        let header = Object.keys(this.state.sheets[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
     
     renderTableData() {
        return this.state.sheets.map((sheet, index) => {
           const { preview, name, author} = sheet //destructuring
           return (
              <tr key={name}>
                 <td><img src={sheet.preview}width="50" height="60"alt="Not loaded."></img></td>
                 <td><Router>
                 <Route exact path="/sheetdetail/:sheetName" component={SheetDetailPage} />
                 <Link to={`/sheetdetail/${sheet.name}`}>{sheet.name}</Link>
                    </Router></td>
                 <td>{author}</td>
 
              </tr>
           )
        })
     }
     sortName(){
       const sortedResult = this.state.sheets.sort((e1, e2) => {
         return e1.name.localeCompare(e2.name);
       }).map(e=>e);
 
       this.setState({sheets: sortedResult});
       
     }
     sortAuthor(){
       const sortedResult = this.state.sheets.sort((e1, e2) => {
         return e1.author.localeCompare(e2.author);
       }).map(e=>e);
 
       this.setState({sheets: sortedResult});
       
     }
     
     render() {
        return (
           <div>
             <p><button  onClick={() => this.sortName()}>Sort By Name (A-Z)</button> <button  onClick={() => this.sortAuthor()}>Sort By Author (A-Z)</button></p>
              <h1 id='title'>Sheet Database</h1>
              <table id='students'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
     
  }
export default Table