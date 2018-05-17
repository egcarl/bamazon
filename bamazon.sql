CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT(100) NOT NULL, 
product_name VARCHAR (100) NOT NULL, 
department_name VARCHAR(30) NOT NULL, 
price DECIMAL(10,2) NOT NULL, 
stock_quantity INT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity)
VALUES (1,"product1","department1",1.1,10),
(2,"product2","department2",2.2,20),
(3,"product3","department3",3.3,30),
(4,"product4","department4",4.4,31),
(5,"product5","department5",5.5,32),
(6,"product6","department6",6.6,33),
(7,"product7","department7",7.7,34),
(8,"product8","department8",8.8,35),
(9,"product9","department9",9.9,36),
(10,"product10","department10",10.11,37);