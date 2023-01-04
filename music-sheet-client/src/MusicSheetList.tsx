interface IMusicSheet {
  name: string,
  author: string;
  imgsrc:string;
}

const MusicSheetList = () => { 

    const musicSheetData: IMusicSheet[] = [
      {name: "name 1", author: "author 1", imgsrc: "./imgs/music_sheet.png"},
      {name: "name 2", author: "author 2", imgsrc: "./imgs/music_sheet.png"},
      {name: "name 3", author: "author 2", imgsrc: "https://images-na.ssl-images-amazon.com/images/I/71HYXWNeryL._SX466_.jpg"},
      {name: "name 4", author: "author xx", imgsrc: "./imgs/music_sheet.png"},
    ]
  
    return (
      <div>
        {
          musicSheetData.map(sheetItem =>
            <p key={sheetItem.name}>{`name: ${sheetItem.name} author: ${sheetItem.author}`} <img src={sheetItem.imgsrc}width="50" height="60"alt="Not loaded."></img> </p> 
          )
        }

      </div>

    );
};

export default MusicSheetList;