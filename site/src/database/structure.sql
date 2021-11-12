CREATE TABLE `Users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `first_name` VARCHAR(100) NOT NULL,
   `last_name` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `image` VARCHAR(100),
   `rol_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(255) NOT NULL,
   `price` DECIMAL NOT NULL,
   `featured_product` TINYINT NOT NULL,
   `discount` INT,
   `category_id` INT NOT NULL,
   `brand_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Rols` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `Brands` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Images` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `file` VARCHAR(255) NOT NULL,
   `product_id` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `status` VARCHAR(255) NOT NULL,
   `user_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Carts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `cantidad` INT NOT NULL,
   `product_id` INT NOT NULL,
   `user_id` INT NOT NULL,
   `order_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `Users` ADD CONSTRAINT `FK_0966046c-8bea-40f5-bbde-802f0bf8a333` FOREIGN KEY (`rol_id`) REFERENCES `Rols`(`id`)  ;

ALTER TABLE `Products` ADD CONSTRAINT `FK_5f2c117c-efe9-4ab0-8873-ae7e79a34e3b` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`)  ;

ALTER TABLE `Products` ADD CONSTRAINT `FK_c877feaf-a07b-4fa8-8f9d-41f1749a622e` FOREIGN KEY (`brand_id`) REFERENCES `Brands`(`id`)  ;

ALTER TABLE `Images` ADD CONSTRAINT `FK_2388ff2a-2e7b-4ec6-a409-b0768649ae23` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`)  ;

ALTER TABLE `Orders` ADD CONSTRAINT `FK_6c453fe6-6b88-4c3a-80e3-5d19665e3b64` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `Carts` ADD CONSTRAINT `FK_2edd9173-e237-4110-908f-4a943673c298` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `Carts` ADD CONSTRAINT `FK_5adbe332-68ff-4b58-adf4-dc2d1eb64b82` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`)  ;

ALTER TABLE `Carts` ADD CONSTRAINT `FK_5e519bc4-147c-4890-ad8d-c0845eac59ca` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`)  ;
