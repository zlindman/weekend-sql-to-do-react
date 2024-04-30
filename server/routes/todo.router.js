const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "tasks" ORDER BY CASE WHEN NOT "completed" THEN 0 ELSE 1 END`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
    })
        .catch((error) => {
            console.log(`error making db query ${sqlText}`, error);
            res.sendStatus(500);
    })
})

// POST
router.post('/', (req, res) => {
    console.log(req.body);
    const task = req.body;
    const sqlText = `INSERT INTO "tasks" ("task", "completed") 
    VALUES ($1, $2)`;
    pool.query(sqlText, [task.task, task.isComplete])
        .then((result) => {
            console.log(`added this task to db: `, task);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`error making db query ${sqlText}: `, error);
            res.sendStatus(500);
        })

})

// PUT
router.put('/:id', (req, res) => {
    const sqlText = `UPDATE "tasks" SET "completed" = CASE WHEN "completed" IS NULL THEN TRUE
    ELSE NOT "completed" END WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            console.log(`Updated task with id`, req.params.id);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}:`, error);
            res.sendStatus(500); 
        })
})


// DELETE
router.delete('/:id', (req, res) => {
    const sqlText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            console.log(`Deleted task with id`, req.params.id);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}:`, error);
            res.sendStatus(500); 
        })
})

module.exports = router;
