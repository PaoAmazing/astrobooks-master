// src/components/BookViewer.js
import React from 'react';

const BookViewer = ({ book }) => {
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <img src={book.cover} alt={`${book.title} Cover`} />

      {/* Renderize o conteúdo HTML do livro */}
      <div dangerouslySetInnerHTML={{ __html: book.content }} />

      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default BookViewer;
