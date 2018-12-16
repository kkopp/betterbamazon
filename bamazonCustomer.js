require('dotenv').config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
var chalk = require("chalk");
var chalkAnimation = require('chalk-animation');
var figlet = require('figlet');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,

  port: process.env.DB_PORT,

  user: process.env.DB_USER,

  password: process.env.DB_PASS,

  database: "bamazon"
});

// figlet.fonts(function(err, fonts) {
//   if (err) {
//       console.log('something went wrong...');
//       console.dir(err);
//       return;
//   }
//   console.dir(fonts);
// });

figlet.text('Bamazon', {
  font: "crazy",
  horizontalLayout: 'default',
  verticalLayout: 'default'
}, function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log("\n-----------------------------------------------------------------------------------\n");
  console.log(data);
  console.log("\n-----------------------------------------------------------------------------------\n");
});

connection.connect(function (err) {
  if (err) throw err;

  //console.log("You are connected");

  showAllItems();


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
  console.log("\n-----------------------------------------------------------------------------------\n");

  inquirer.prompt([
    {
      type: "input",
      name: "buyproduct",
      message: "What product ID would you like to purchase today?",
      validate: function(value) {
        if (Number.isInteger(parseFloat(value))) {
          return true;
        } else {
          return "Invalid Input. Please enter a number.";
        }
      },
      filter: Number
    },
    {
      type: "input",
      name: "buyquantity",
      message: "Great choice! How many of those would you like?",
      validate: function(value) {
        if (Number.isInteger(parseFloat(value))) {
          return true;
        } else {
          return "Invalid Input. Please enter a number.";
        }
      },
      filter: Number

    }
  ])

    .then(function (answer) {

      var product = answer.buyproduct;
      var quantity = answer.buyquantity;

      var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";

      connection.query(query, { item_id: product }, function (err, res) {

        if (err) throw err;

        //console.log(res[0]);
        var itemInfo = res[0];
        if (quantity <= itemInfo.stock_quantity) {
          console.log("\n-----------------------------------------------------------------------------------\n");
          console.log("Fantastic! We have " + itemInfo.stock_quantity + " " + itemInfo.product_name + " in stock!");
          var updateQuery = "UPDATE products SET stock_quantity = " + (itemInfo.stock_quantity - quantity) + " WHERE item_id = " + product;

          //console.log(updateQuery);

          connection.query(updateQuery, function (err, res) {
            if (err) throw err;

            console.log("Your order has now been placed! Your invoice for $" + itemInfo.price * quantity + " will be sent to the address we have on file.");
            var rainbow = chalkAnimation.rainbow("Thank you for shopping at Bamazon!");
            console.log("\n-----------------------------------------------------------------------------------\n");
            rainbow.start();
            connection.end();

          })

        } else {

            console.log("I'm sorry.  We do not have enough " + res[0].product_name + " in stock. Please order another quantity.")
            console.log("\n----------------------------------------------------------------------------------\n");
            showAllItems();

        }
      })

    });
}