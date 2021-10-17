import { Button, Modal } from "reactstrap";
import React, { useState } from "react";

const BookCard = props => {
    const { thumbnail, title, pageCount, language, authors, publisher, previewLink } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (

        <div style={{ width: "200px", padding: "10px", backgroundColor: "#eee" }}>

            <img top style={{ width: "100%", height: "210px" }} src={thumbnail} alt={title} />
            <div className="card-title">{title}</div>
            <Button onClick={toggle}>More</Button>

            <Modal isOpen={modal} toggle={toggle}>
                <div className="modal-header">
                    <button aria-label="Close" className="close" type="button" onClick={toggle}>
                        <span aria-hidden={true}>X</span>
                    </button>
                </div>

                <div className="modal-body">
                    <p>Page Count: {pageCount}</p>
                    <p>Language : {language}</p>
                    <p>Authors : {authors}</p>
                    <p>Publisher : {publisher}</p>
                </div>

                <div className="modal-footer">
                    <a href={previewLink} color="default" type="button" target="_blank" rel="noopener noreferrer">
                        Go to the book
                    </a>
                </div>
            </Modal>

        </div>
    );
};

export default BookCard;