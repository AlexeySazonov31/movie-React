import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

import path from "path";
import { fileURLToPath } from "url";

let PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY_OMDb = process.env.API_KEY_OMDb;
const API_KEY_IMDb = process.env.API_KEY_IMDb;

const dataSelections = [
  {
    name: 'Top250Movies',
    data: []
  },
  {
    name: 'MostPopularMovies',
    data: []
  },
  {
    name: 'MostPopularTVs',
    data: []
  },
  {
    name: 'ComingSoon',
    data: []
  },
  {
    name: "BoxOffice",
    data: []
  },
  {
    name: "InTheaters",
    data: []
  }
]

let app = express();

getSelections();
//updating collection data every six hourslet 
let timerUpdateSelectionsID = setInterval( () => {
  getSelections();
}, 21600000 )


app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
  console.log('sent html page')
});



app.use('/selectionData/:name' , (req,res) => {
  for( let selection of dataSelections ){
    if( selection.name === req.params.name ){
      res.json(selection.data);
      console.log( 'sent data: ' +  selection.name);
    }
  }
})

app.use('/search/:search/:type?', (req,res) => {
  let url = `http://www.omdbapi.com/?apikey=${API_KEY_OMDb}&s=${req.params.search}`;
  if( req.params.type !== undefined && req.params.type !== "all" ){
    url = url + '&type=' + req.params.type;
  }
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.json(data)
      console.log('search by request: ' + req.params.search + ', type: ' + req.params.type);
    })
    .catch(error => {
      console.error(error);
      res.json(error)
    })
})

app.use('/getMoreInfo/:id', (req,res) => {
  fetch(`http://www.omdbapi.com/?apikey=${API_KEY_OMDb}&i=${req.params.id}&plot=full`)
  .then((res) => res.json())
  .then((data) => {
    res.json(data)
    console.log('sent More info by id: ' + req.params.id);
  })
  .catch(error => {
    console.error(error);
    res.json(error)
  })
})



app.listen(PORT, () => {
  console.log("running, port: " + PORT);
});



// selection caching function 
function getSelections() {
  for( let selection of dataSelections ){
    fetch(`https://imdb-api.com/en/API/${selection.name}/${API_KEY_IMDb}`)
    .then((res) => res.json())
    .then((data) => {
      selection.data = data;
      console.log(selection.name + ": (+)");
    })
    .catch( error => {
      selection.data = '';
      console.error(error);
    })
  }
}
