var Book = require('./models/book');

module.exports = function(app) {
  app.get('/book', async function(req, res) {
    try {
      const result = await Book.find({});
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/book', async function(req, res) {
    try {
      const book = new Book({
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author,
        pages: req.body.pages
      });

      const result = await book.save();
      res.json({
        message: 'Successfully added book',
        book: result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/book/:isbn', async function(req, res) {
    try {
      const result = await Book.findOneAndDelete(req.query);
      res.json({
        message: 'Successfully deleted the book',
        book: result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  var path = require('path');

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
  });
};


// //Key points to note:

// Async/Await: The route handlers are now declared as async functions, allowing the use of await with asynchronous operations.

// Try/Catch Blocks: Error handling is now done with try/catch blocks, providing a cleaner way to handle errors.

// Promises: The Mongoose operations (find, save, findOneAndRemove) are now awaited, and the use of callbacks has been replaced with promises.