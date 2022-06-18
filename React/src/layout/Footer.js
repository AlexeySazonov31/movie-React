function Footer() {
  return (
    <footer>
      <p>
        Demonstrative React-app for finding movies and series. Server resource
        1000 requests per day, please use the site for presentation purposes
        only. Try a hard reset if you have problems, thanks.
      </p>
      <hr></hr>
      <p>© Sazonov A.S., {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
