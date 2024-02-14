const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to retrieve posts
app.get('/api/posts', async (req, res) => {
  try {
    const data = await fs.readFile('posts.json', 'utf-8');
    const posts = JSON.parse(data);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to submit a new post
app.post('/api/posts', async (req, res) => {
  try {
    const data = await fs.readFile('posts.json', 'utf-8');
    const posts = JSON.parse(data);
    const newPost = { id: Date.now(), text: req.body.text };
    posts.push(newPost);
    await fs.writeFile('posts.json', JSON.stringify(posts, null, 2));
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

