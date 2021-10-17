import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button, FormGroup, Label, Spinner } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookCard from "./BookCard.js";
import "./App.css";

function App() {

  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);


  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 30 || maxResults < 1) {
      toast.error('max results must be between 1 - 30');
      setLoading(false);
    } else {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`)
      .then(response => { 
          setCards(response.data.items);
          setLoading(false);
      })
    }
  };


  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className="display-2 text-center text-white mb-3">Google Books</h1>
        <div className="input-area">
          <InputGroup className="mb-3">
            <Input autoFocus placeholder="Book Search" value={query} 
                   onChange={e => setQuery(e.target.value)}/>
            <InputGroupAddon addonType="append">
              <Button color="secondary" type="submit" onClick={handleSubmit}>
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
              previewLink={item.volumeInfo.previewLink}
            />
          </div>
        );
      });
      return (
        <div className="container my-4">
          <div className="row">{items}</div>
        </div>
      );
    }};


  return (
    <>
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </>
  );
}

export default App;