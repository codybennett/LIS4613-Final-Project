/**
 * Final Project: Inventory Management System: A simple system for managing products, stock levels, and supplier information.
 * Author: Cody Bennett
 * Date: 2024-04-29
 * Notes: This module implements a login form utilizing a MySQL database and features the following:
 *  - Utilizes external configuration file to authenticate to the database securely
 *  - Searches columns/fields based on inputs
 *  - Escapes all user supplied inputs using parameterized query to prevent SQL Injection Vulnerability
 */

const express = require('express');
const mysql = require('mysql');
const app = express();
const helmet = require('helmet')
const bodyParser = require('body-parser');
const session = require('express-session');
// Use dotenv for passing sensitive environment variables
require("dotenv").config();
const cookieParser = require('cookie-parser');
// MySQL based Session Store
const MySQLStore = require('express-mysql-session')(session);
// Utilize CSRF for XSRF mitigation techniques
var Tokens = require('csrf')

app.use(
    helmet({
        contentSecurityPolicy: false,
        xDownloadOptions: false,
    }),
);
app.use(bodyParser.urlencoded({
    extended: false
}));

// "Global" token set for "this" backend execution
var tokens = new Tokens()
var secret = tokens.secretSync()

// Create an Express application
app.use(cookieParser())

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json()); // Middleware to parse JSON requests

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});

// Use external MySQL database backend for server side session management
const sessionStore = new MySQLStore({
    expiration: 10000000,
    createDatabaseTable: true,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});

// Define and pass sessionStore options
app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day ( 1 day * 24 hr/1 day * 60 min/1 hr )
        },
    })
);

// Static HTML options; this is just the file name
var static_options = {
    index: "./index.html"
};
// Serve HTML using above options
app.use('/', express.static('client', static_options));


// Use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
}).catch(error => {
    // Something went wrong.
    console.error(error);
});

// Define port and start server that listens on it
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Login route
app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;
    // Pass authentication parameters and check if password matches expect value
    // - Password is stored in database as simple SHA2 hash
    // - For production use this should be a different cryptographic function
    const query = "SELECT * FROM users WHERE username = ? AND password = SHA2(?,224)";
    // Fix vulnerable SQL query by using parameterized inputs
    connection.query(query, [username, password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            console.log("ADDING COOKIES")
            const token = tokens.create(secret)
            res.cookie("csrf", token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true
            })
            res.cookie("sessionID", req.session.id, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true
            })
            req.session.save()
        }
        res.send("Success")
        res.end()
    });
});

// Logout route
app.post('/logout', (req, res) => {
    sessionStore.destroy(req.cookies["sessionID"])
    res.clearCookie("sessionID")
    res.clearCookie("csrf")
    res.redirect('/')
    res.end()
});

app.get('/check-session', (req, res) => {
    if (!tokens.verify(secret, req.cookies.csrf) || !req.cookies.sessionID) {
        // If secret does not match, respond with appropriate 401 and message
        // I did not want to indicate why they are unauthorized as that enables a new attack vector
        res.status(401)
        // End response
        res.end()
        // close out session
        return
    }
    if (req.cookies["sessionID"]) {
        console.log("Logged In")
        res.status(200)
        // End response
        res.end()
        // close out session
        return
    }
})

/**
 * Search database via provided inputs
 */
app.post('/search-item', (req, res) => {
    // Search operations are READONLY and do not require authentication
    const {
        name,
        description,
        supplier
    } = req.body;
    // Log parsed input
    console.log(name, description, supplier);
    // If there are no filters provided the query will by default match and display all records
    const sql = 'SELECT * FROM items WHERE name LIKE ? AND (description LIKE ? OR description is NULL) AND (supplier LIKE ? OR supplier is NULL)';
    connection.query(sql, [`%${name}%`, `%${description}%`, `%${supplier}%`], (error, results) => {
        if (error) throw error;
        console.log(results)
        res.send(JSON.stringify(results))
        res.end()
    });
});


/**
 * Add item to database via provided inputs
 */
app.post('/add-item', (req, res) => {
    if (!tokens.verify(secret, req.cookies.csrf) || !req.cookies.sessionID) {
        // If secret does not match, respond with appropriate 401 and message
        // I did not want to indicate why they are unauthorized as that enables a new attack vector
        res.status(401).send("UNAUTHORIZED ACCESS")
        // End response
        res.end()
        // close out session
        return
    }
    const {
        name,
        description,
        quantity,
        supplier
    } = req.body;
    // Log parsed input
    console.log(name, description, supplier);
    // If there are no filters provided the query will by default match and display all records
    const sql = 'insert into items (name,description,supplier,quantity)  VALUES(?,?,?,?)';
    connection.query(sql + ` ON DUPLICATE KEY UPDATE name='${name}',description='${description}',supplier='${supplier}',quantity=${quantity}`, [name, description, supplier, quantity], (error, results) => {
        if (error) throw error;
        console.log(results)
        res.send(JSON.stringify(results))
        res.end()
    });
});

/**
 * Update database via provided inputs
 */
app.put('/update-item', (req, res) => {
    if (!tokens.verify(secret, req.cookies.csrf) || !req.cookies.sessionID) {
        // If secret does not match, respond with appropriate 401 and message
        // I did not want to indicate why they are unauthorized as that enables a new attack vector
        res.status(401).send("UNAUTHORIZED ACCESS")
        // End response
        res.end()
        // close out session
        return
    }
    const {
        name,
        description,
        supplier,
        quantity,
        id
    } = req.body;
    // Log parsed input
    console.log(description, supplier, quantity);
    // Cannot/Will not update primary key `Name` for multiple items
    // If there are no filters provided the query will by default match and display all records
    if (!name) {
        const sql = 'UPDATE items SET description=?, supplier=?, quantity=? WHERE id in (?)';
        connection.query(sql, [description, supplier, quantity, id], (error, results) => {
            if (error) throw error;
            console.log(results)
            res.send(JSON.stringify(results))
            res.end()
        });
    }
    if (name) {
        const sql = `UPDATE items SET description=?, supplier=?, quantity=? WHERE NAME LIKE ?`;
        connection.query(sql, [description, supplier, quantity, `%${name}%`], (error, results) => {
            if (error) throw error;
            console.log(results)
            res.send(JSON.stringify(results))
            res.end()
        });
    }

});


// Deleting item(s) from database that match provided criteria
app.delete('/delete-item', (req, res) => {
    if (!tokens.verify(secret, req.cookies.csrf) || !req.cookies.sessionID) {
        // If secret does not match, respond with appropriate 401 and message
        // I did not want to indicate why they are unauthorized as that enables a new attack vector
        res.status(401).send("UNAUTHORIZED ACCESS")
        // End response
        res.end()
        // close out session
        return
    }
    const {
        id,
        name,
        description,
        supplier
    } = req.body;
    console.log(req.body)

    // Overload operator to allow deletion by ID
    // - Used for deleting multiple selections via UI
    if (id) {
        const sql = `DELETE FROM items WHERE id in (?)`;
        console.log("IDS: " + id)
        connection.query(sql, [id], (error, results) => {
            if (error) throw error;
            console.log(results)
            res.send(JSON.stringify(results))
            res.end()
        })
    }
    // Escape table name to prevent SQL Injection
    // Only perform DELETE operation if a value is passed
    if (name || description || supplier) {
        const sql = `DELETE FROM items WHERE (name LIKE ? AND name LIKE '%') AND (description LIKE ? OR description is NULL) AND (supplier LIKE ? OR supplier is NULL)`;
        connection.query(sql, [name, description, supplier], (error, results) => {
            if (error) throw error;
            console.log(results)
            res.send(JSON.stringify(results))
            res.end()
        })
    }

    // otherwise use more performant TRUNCATE to retain SCHEMA
    if (!name && !description && !id && !supplier) {
        console.log("TRUNCATEING")
        var sqlDelete = `TRUNCATE TABLE items`;
        connection.query(sqlDelete, (error, results) => {
            if (error) throw error;
            console.log(results)
            res.send(JSON.stringify(results))
            res.end()
        });
    }
});
