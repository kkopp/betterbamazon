# Bamazon (just like Amazon, but better!)

## About
Bamazon is a CLI storefront.  Pick from 10 fantastical items.  Don't spend all your money in one place!

## The Bamazon Demo

```
node bamazonCustomer.js
```
Initializing the file will bring you to the Bamazon store front. It shows you a list of items available in the store and will prompt you to pick an item to purchase, you will then specify the quantity you want to purchase, then it will let you know if your order was successful. It will also tell you the total for the items you purchased.

![screenshot](demo.gif)

When prompted, if you enter anything other than a number, you will receive an error letting you know that you need to enter a number. If you order a quantity more than what is available, you will receive an error saying to you will need to order a different quantity.

![screenshot](fails.gif)


## Technologies Used
* node.js
* javascript
* npm packages (mysql, inquirer, easy-table, chalk-animation, figlet, dotenv)