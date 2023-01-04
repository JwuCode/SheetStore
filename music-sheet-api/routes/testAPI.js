var express = require("express");
var router = express.Router();
var fs = require('fs');
const testData = [
    { preview: 1, name: 'Adabana Necromancy',  author: 'Animenz', id: 1, sheetlink:'./sheetsPdf/Adabana Necromancy.pdf', videoLink:"cxneWhjeBnI", date:"TEMP"},
    { preview: 39, name: 'Again',   author: 'Animenz', id: 2, sheetlink:'./sheetsPdf/Again.pdf', notes: "FMAB OP", videoLink:"Kt_JePg86b8", date:"TEMP"},
    { preview: 39, name: 'aLIEz',   author: 'Animenz', id: 3, sheetlink:'./sheetsPdf/aLIEz.pdf', notes: "", videoLink:"qhrj-Vqp95s", date:"TEMP"},
    { preview: 39, name: 'Anamnesis',   author: 'Animenz', id: 4, sheetlink:'./sheetsPdf/Anamnesis.pdf', notes: "", videoLink:"Z1gqNTdriqQ", date:"TEMP"},
    { preview: 39, name: 'AQUA',   author: 'Animenz', id: 5, sheetlink:'./sheetsPdf/AQUA.pdf', notes: "", videoLink:"jGladI_ELXM", date:"TEMP"},
    { preview: 39, name: 'Attack on Titan (Main Theme)',   author: 'Animenz', id: 6, sheetlink:'./sheetsPdf/Attack on Titan.pdf', notes: "AOT OST", videoLink:"69lx6TvQTFg", date:"TEMP"},
    { preview: 39, name: 'Departures',   author: 'Animenz', id: 7, sheetlink:'./sheetsPdf/Departures.pdf', notes: "Guilty Crown ED", videoLink:"5hft807EJ6o", date:"TEMP"},
    { preview: 39, name: 'Bios',   author: 'Animenz', id: 8, sheetlink:'./sheetsPdf/Bios.pdf', notes: "Guilty Crown OST", videoLink:"DcjUOdeq6G8", date:"TEMP"},
    { preview: 39, name: 'Blue Bird',   author: 'Animenz', id: 9, sheetlink:'./sheetsPdf/Blue Bird.pdf', notes: "Naruto OP", videoLink:"FTrJ-J_lsr0", date:"TEMP"},
    { preview: 39, name: 'Blumenkranz',   author: 'Animenz', id: 10, sheetlink:'./sheetsPdf/Blumenkranz.pdf', notes: "Kill la kill OP", videoLink:"CfD8embOaHQ", date:"TEMP"},
    { preview: 39, name: 'Brave Shine',   author: 'Animenz', id: 11, sheetlink:'./sheetsPdf/Brave Shine.pdf', notes: "Fate/Stay Night OP", videoLink:"R9xZGpupgLw", date:"TEMP"},
    { preview: 39, name: 'Butterfly',   author: 'Animenz', id: 12, sheetlink:'./sheetsPdf/Butterfly.pdf', notes: "Digimon OP", videoLink:"woktSuBWR3U", date:"TEMP"},
    { preview: 39, name: 'City of Eternity',   author: 'Animenz', id: 13, sheetlink:'./sheetsPdf/City of Eternity.pdf', notes: "", videoLink:"sbzkJ-d9qgs", date:"TEMP"},
    { preview: 39, name: 'COLORS',   author: 'Animenz', id: 14, sheetlink:'./sheetsPdf/COLORS.pdf', notes: "Code Geass OP", videoLink:"aFzeMMgHaLQ", date:"TEMP"},
    { preview: 39, name: 'Eonian',   author: 'Animenz', id: 15, sheetlink:'./sheetsPdf/Eonian.pdf', notes: "", videoLink:"XUuvTRBwdy0", date:"TEMP"},
    { preview: 39, name: 'Euterpe',   author: 'Animenz', id: 16, sheetlink:'./sheetsPdf/Euterpe.pdf', notes: "Guilty Crown OST", videoLink:"_8UZMD3A2rs", date:"TEMP"},
    { preview: 39, name: 'Everyday World',   author: 'Animenz', id: 17, sheetlink:'./sheetsPdf/Everyday World.pdf', notes: "Oregairu ED", videoLink:"NX8egPe6Ulc", date:"TEMP"},
    { preview: 39, name: 'Extra Magic Hour',   author: 'Animenz', id: 18, sheetlink:'./sheetsPdf/Extra Magic Hour.pdf', notes: "Amagi Brilliant Park OP", videoLink:"P4Weq5rsiJw", date:"TEMP"},
    { preview: 39, name: 'Fubuki',   author: 'Animenz', id: 19, sheetlink:'./sheetsPdf/Fubuki.pdf', notes: "Kantai Collection ED ", videoLink:"x1OMibyamkw", date:"TEMP"},
    { preview: 39, name: 'Guren no Yuminya',   author: 'Animenz', id: 20, sheetlink:'./sheetsPdf/Guren no Yuminya.pdf', notes: "Attack on Titan OP1", videoLink:"68gdfv0Vm7s", date:"TEMP"},
    { preview: 39, name: 'Hikaru Nara',   author: 'Animenz', id: 21, sheetlink:'./sheetsPdf/Hikaru Nara.pdf', notes: "Your Lie in April OP", videoLink:"zsVAbS8xmaU", date:"TEMP"},
    { preview: 39, name: 'Jiyuu no Tsubasa (Animenz + Ishter duet)',   author: 'Animenz', id: 22, sheetlink:'./sheetsPdf/Jiyuu no Tsubasa (piano duet).pdf', notes: "Attack on Titan OP2", videoLink:"NqRPg_0Xdqk", date:"TEMP"},

];

router.get("/sheets", function(req, res, next) {
    res.send(testData);
});

router.get("/sheetpdf/:sheetname", function(req, res, next){
    var sheetIndex = testData.findIndex(obj => obj.name === req.params.sheetname.replace(/%20/g, "%20"));
    var stream = fs.createReadStream(testData[sheetIndex].sheetlink);
  var filename = req.params.sheetname.replace(/%20/g, "%20"); 
  // Be careful of special characters

  filename = encodeURIComponent(filename);
  // Ideally this should strip them

  res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  stream.pipe(res);

}); 
module.exports = router;