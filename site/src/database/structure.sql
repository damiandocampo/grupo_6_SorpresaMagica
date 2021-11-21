CREATE TABLE Rols (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE Users (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   image VARCHAR(255),
   rol_id INT NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE Brands (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE Categories (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   image VARCHAR(255),
   PRIMARY KEY (id)
);

CREATE TABLE Products (
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(255) NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   featured_product TINYINT NOT NULL,
   discount INT,
   image VARCHAR(255) NOT NULL,
   category_id INT NOT NULL,
   brand_id INT NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE Orders (
   id INT NOT NULL AUTO_INCREMENT,
   status VARCHAR(255) NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE Carts (
   id INT NOT NULL AUTO_INCREMENT,
   cantidad INT NOT NULL,
   product_id INT NOT NULL,
   user_id INT NOT NULL,
   order_id INT NOT NULL,
   PRIMARY KEY (id)
);

ALTER TABLE Users ADD CONSTRAINT rol_id_fk FOREIGN KEY (rol_id) REFERENCES Rols(id);

ALTER TABLE Products ADD CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES Categories(id);

ALTER TABLE Products ADD CONSTRAINT brand_id_fk FOREIGN KEY (brand_id) REFERENCES Brands(id);

ALTER TABLE Orders ADD CONSTRAINT user_id_orders_fk FOREIGN KEY (user_id) REFERENCES Users(id);

ALTER TABLE Carts ADD CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES Products(id);

ALTER TABLE Carts ADD CONSTRAINT user_id_carts_fk FOREIGN KEY (user_id) REFERENCES Users(id);

ALTER TABLE Carts ADD CONSTRAINT order_id_fk FOREIGN KEY (order_id) REFERENCES Orders(id);
