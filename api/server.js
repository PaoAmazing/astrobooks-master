// api/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

const booksFolderPath = path.join(__dirname, 'booksInfo');
const livrosUnzipFolderPath = 'C:\\Users\\joaovitor.santos\\Documents\\Estudo Python\\astrobooks-master\\api\\LivrosUnzip';  // Caminho para a pasta LivrosUnzip
const PORT = 5000;

app.use(cors());

app.use(express.static(booksFolderPath));

app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookPath = path.join(booksFolderPath, bookId, 'data.json');

  try {
    const data = require(bookPath);
    
    // Leia o conteúdo HTML do livro
    const htmlPath = path.join(livrosUnzipFolderPath, bookId, `${bookId}.html`);
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Adicione o conteúdo HTML à resposta
    data.content = htmlContent;

    res.json(data);
  } catch (error) {
    console.error(`Error reading data for book ${bookId}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(booksFolderPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



