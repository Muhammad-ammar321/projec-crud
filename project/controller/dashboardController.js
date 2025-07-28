const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
app.use(express.urlencoded({}))
app.use(express.json())

const dataPath = path.join(__dirname, "../data.json");

const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};


module.exports= {
    async  create(req,res){
        res.render("register")
    },
    async forget(req,res){
        res.render("forgot_password")
    },
    async dashboard(req, res) {
        try {
            const data = await readData();
            const students = data.students.filter(s => !s.deleted_at);
            const student = students.find(s=> s.id === req.user.id)
            // const student = students.find(s => s.email === email.trim() && s.password === password.trim());
            res.render("dashboard", student );
        } catch (err) {
            res.status(500).send("Error reading student data.");
        }
    },
    async profile(req, res) {
        try {
            const data = await readData();
            const student = data.students.find(s => s.id === req.user.id);
            res.render("user", student );
        } catch (err) {
            res.status(500).send("Error reading student data.");
        }
    },

    async edit(req, res)  {
       try {
            const data = await readData();
            const student = data.students.find(s => s.id === req.user.id);
            res.render("edit", student );
        } catch (err) {
            res.status(500).send("Error reading student data.");
        }
    }


}