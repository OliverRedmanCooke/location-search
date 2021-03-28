const express = require('express');
const router = express.Router();
const database = require('../database/db')

/* GET search page. */
router.get('/', async (req, res) => {
  try {
  
    const query = req.query.q || null
    
    if(!query) {
        res.status(400).send("Please provide a search query")
        return
    }

    if(query.length <= 2) {
        res.status(400).send("Please provide a query that is more than 2 characters")
        return
    }

    const db = await database.getDB()

    results = await db.all(`SELECT * FROM locations WHERE name LIKE '%${query}%' or alternatenames LIKE '%${query}%'`)

    res.status(200).send(results)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
});



module.exports = router;