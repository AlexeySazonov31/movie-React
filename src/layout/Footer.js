function Footer(){
    function idTOp250(){
        let arr = [];
        fetch( 'https://imdb-api.com/en/API/Top250Movies/k_muf4olu9' )
          .then(res => res.json())
          .then((data) => {
            console.log(data.items)
            for( let elem of data.items ){
                arr.push(elem.id);
            }
            console.log(arr);
        })
    }
    return <footer>
        <p>Demonstrative React-app for finding movies and series. 
            Server resource 1000 requests per day, 
            please use the site for presentation purposes only. 
            Try a hard reset if you have problems, thanks.</p>
        <hr></hr>
        <p>© Sazonov A.S., {(new Date()).getFullYear()}</p>
        <button onClick={() => idTOp250()}>click</button>
    </footer>
}

export default Footer;
