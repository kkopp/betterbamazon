DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

	item_id INT AUTO_INCREMENT NOT NULL,
    
    product_name VARCHAR(100) NOT NULL,
    
    department_name VARCHAR(50) NOT NULL,
    
    price DECIMAL(5,2) NOT NULL,
    
    stock_quantity INT(10) NOT NULL,

	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("snazzy stamp book", "office supplies", 9.99, 100), ("standard black pens", "office supplies", .99, 150), ("sticky tape", "office supplies", 4.99, 75), ("refreshing water", "grocery", 2.99, 500), ("furry bear slippers", "clothing", 24.50, 25), ("last year's calendars", "office supplies", 1.99, 10), 
("squeaky bones", "pet supplies", 5.99, 56), ("squishy pillows", "home goods", 29.99, 43), ("purple potato chips", "grocery", 3.75, 120), ("old VHS tapes", "electronics", 14.50, 37);