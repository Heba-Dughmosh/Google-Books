import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button, FormGroup, Label, Spinner } from "reactstrap";
import axios from "axios";
import BookCard from "./BookCard.js";
import "./App.css";

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const handleSubmit = () => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`)
      .then(response => { 
        response.data.items.length > 0 && 
          setCards(response.data.items);
          setLoading(false);
      })
      .catch(err => setLoading(true))
  };


  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className="display-2 text-center text-white mb-3">Google Books</h1>
        <div className="input-area">
          <InputGroup className="mb-3">
            <Input placeholder="Book Search" value={query} 
                   onChange={e => setQuery(e.target.value)}/>
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={handleSubmit}>
                <i className="fas fa-search"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup>
              <Label for="maxResults">Max Results</Label>
              <Input type="number" id="maxResults" placeholder="Max Results" value={maxResults} 
                     onChange={e => setMaxResults(e.target.value)} />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  };


  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = "";
        if (item.volumeInfo.imageLinks){
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }
        return (
          <div className="col-lg-4 mb-3" key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
            />
          </div>
        );
      });
      return (
        <div className="container my-5">
          <div className="row">{items}</div>
        </div>
      );
    }};


  return (
    <div className="w-100 h-100">
      {mainHeader()}
      {handleCards()}
    </div>
  );
}

export default App;
