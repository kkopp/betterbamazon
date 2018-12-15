require('dotenv').config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
var chalk = require("chalk");
const chalkAnimation = require('chalk-animation');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,

  port: process.env.DB_PORT,

  user: process.env.DB_USER,

  password: process.env.DB_PASS,

  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;

  //console.log("You are connected");
  console.log(chalk.hex('#33B2FF').underline("Welcome to Bamazon!"))
  showAllItems();
  //runSearch();
});


function showAllItems() {

  var query = "SELECT * FROM products";

  
  connection.query(query, function (err, res) {
    //console.log(Object.values(res));

    var t = new Table

    res.forEach(function (res) {
      t.cell('Product ID', res.item_id)
      t.cell('Product', res.product_name)
      t.cell('Department', res.department_name)
      t.cell('Unit Price, USD', res.price, Table.number(2))
      t.cell('Stock On Hand', res.stock_quantity)
      t.newRow()
    })

    console.log(t.toString())

    buyItem();
  })
}

function buyItem() {

  inquirer
    .prompt({
      name: "buyproduct",
      type: "input",
      message: "What product ID would you like to purchase today?",
    })
    .then(function (answer) {

      inquirer
        .prompt({
          name: "buyquantity",
          type: "input",
          message: "Great choice!  You picked item " + answer.buyproduct + "! How many of those would you like?"
        })
        .then(function (answer2) {
          var query = 

          connection.query("SELECT stock_quantity FROM products WHERE ?", {stock_quantity: answer2.buyquantity}, function (err, res) {

            for (var i = 0; i < res.length; i++);
            console.log("does this this really work?")
            // if (i <= res) {
            //   var rainbow = chalkAnimation.rainbow("Thank you for shopping at Bamazon!");
            //   console.log("Great!  We have that in stock!")
            //   rainbow.start();
            // }

          })
        })
    });
}