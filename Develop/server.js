const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extend4ed: true }));
app.use(express.json());

const { notes } = require('./db/db');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
return note;
}

app.get('./public/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('../notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});


app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`API server now live on ${PORT}.`);
});