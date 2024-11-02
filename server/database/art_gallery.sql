CREATE DATABASE IF NOT EXISTS art_gallery;
USE art_gallery;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INT DEFAULT 1 CHECK (stock >= 0),
    image VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
	order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, address, phone_number, gender, is_admin) VALUES
('Admin', 'admin@gmail.com', '$2b$10$Kbo/feajTT2heBjuOpbgK.UuviMpXFNWmDuy8j.3ZawGqGDZvcKii', '10 Tahrir Square, Cairo, Egypt', '+201002345678', 'Male', TRUE),
('Ahmed Elkhyat', 'ahmed@gmail.com', '$2b$10$76ASZgK3gwOEPDZjSr4tL.X4p7gLX6Nlbm7BEcmEF4A7qq.x/jTBm', '24 Abbas El Akkad, Cairo, Egypt', '+201112345678', 'Male', FALSE),
('Laila Ashraf', 'laila@gmail.com', '$2b$10$NqfTxUPd8CaFs3zNV2iZgeJG6A7NdV.joLRXoyhKGNe4rzZOZc3ae', '102 Rehab City, Cairo, Egypt', '+201223456789', 'Female', FALSE),
('Ahmed Morshedy', 'morshedy@gmail.com', '$2b$10$hSl6riTP4lJeZ4JHoIknbuHZE7kFQhAvj0JC7CgyeBlc83yolBpku', '15 El-Salam Street, Cairo, Egypt', '+201334567890', 'Male', FALSE),
('Mustafa Hussein', 'mustafa@gmail.com', '$2b$10$sIfmzkGf1vK6yyjEKpeMC.FINIpsyDH3WVZj7yz/.IWzQHnFBLP/W', '5 El-Ghazali Street, Cairo, Egypt', '+201445678901', 'Male', FALSE);

INSERT INTO categories (category_name) VALUES
('Painting'),
('Sculpture'),
('Photography'),
('Digital Art');

INSERT INTO products (title, description, price, stock, image, category_id) VALUES
('Ocean Waves', 'A serene view of ocean waves crashing on the shore.', 120.00, 15, '1729511922904-823505444.jpg', 1),
('Abstract Night', 'A captivating abstract painting of a starry night.', 180.00, 8, '1729511985498-996569797.jpg', 1),
('Forest Path', 'A tranquil forest path in autumn.', 140.00, 12, '1729512138924-815988420.jpg', 1),
('Modern Art Piece', 'An innovative piece that challenges traditional forms.', 250.00, 6, '1729512357203-16802927.jpg', 2),
('Stone Sculpture', 'A detailed stone sculpture of a mythical creature.', 500.00, 3, '1729512476115-925612357.jpg', 2),
('Nature Photography', 'A stunning photograph capturing nature in all its glory.', 100.00, 20, '1729512553906-501419355.jpg', 3),
('City Lights', 'A dazzling view of city lights at night.', 130.00, 10, '1729512607543-464703453.jpg', 3),
('Digital Portrait', 'A digital portrait of a famous historical figure.', 220.00, 5, '1729512747600-348815761.jpg', 4),
('Floral Arrangement', 'A colorful arrangement of flowers in bloom.', 90.00, 25, '1729512865051-834704277.jpg', 1),
('Vintage Car', 'A classic photograph of a vintage car.', 75.00, 30, '1729512947688-437107907.jpg', 3),
('Golden Sunset', 'A breathtaking sunset over the ocean.', 160.00, 10, '1729513381490-464628553.jpg', 1),
('Contemporary Art', 'A striking piece that explores modern themes.', 300.00, 4, '1729513457195-844568819.jpg', 2),
('Waves at Dusk', 'An enchanting view of waves at dusk.', 115.00, 15, '1729513633118-595255400.jpg', 1),
('Abstract Lines', 'A colorful abstract piece featuring dynamic lines.', 210.00, 7, '1729513765010-325999388.jpg', 4),
('Portrait Photography', 'A captivating portrait that tells a story.', 140.00, 8, '1729513865366-926906365.jpg', 3),
('Geometric Shapes', 'A bold piece made of geometric shapes and colors.', 180.00, 6, '1729513941011-75960478.jpg', 4),
('Desert Landscape', 'A stunning landscape of the desert at sunrise.', 150.00, 10, '1729514005359-543649132.jpg', 1),
('Street Art', 'A photo capturing vibrant street art in the city.', 95.00, 12, '1729514161955-940403391.jpg', 3),
('Rustic Charm', 'A rustic painting depicting rural life.', 130.00, 14, '1729514244552-890562009.jpg', 1),
('Digital Landscape', 'A futuristic digital landscape.', 240.00, 5, '1729514327995-438255237.jpg', 4);

INSERT INTO orders (total_amount, status, user_id) VALUES
(380.00, 'Pending', 2),
(300.00, 'Pending', 3),
(450.00, 'Pending', 4),
(120.00, 'Pending', 5),
(250.00, 'Shipped', 2),
(370.00, 'Delivered', 3),
(590.00, 'Cancelled', 4),
(180.00, 'Delivered', 5);

INSERT INTO order_items (quantity, order_id, product_id) VALUES
(2, 1, 1),
(1, 1, 3),
(1, 2, 2),
(1, 2, 4),
(1, 3, 1),
(1, 4, 3),
(1, 5, 4),
(2, 6, 1),
(1, 7, 3),
(1, 8, 2);

INSERT INTO cart (quantity, user_id, product_id) VALUES
(1, 2, 2),
(1, 3, 1),
(1, 4, 4),
(1, 5, 1),
(1, 2, 5),
(1, 3, 6),
(2, 4, 7),
(1, 5, 8);

INSERT INTO reviews (rating, comment, product_id, user_id) VALUES
(5, 'Absolutely stunning! The colors are vibrant and mesmerizing.', 1, 2),
(4, 'Great sculpture, but a bit smaller than expected.', 2, 3),
(5, 'This piece is breathtaking! Highly recommend.', 1, 4),
(3, 'Nice artwork, but the shipping took too long.', 4, 5),
(5, 'Amazing piece, it looks even better in person!', 5, 2),
(4, 'Very good quality, but the delivery was slow.', 3, 3),
(5, 'Perfect addition to my collection, highly recommended!', 6, 4),
(3, 'The artwork was okay, but not as expected.', 7, 5);

SELECT * FROM users;
SELECT * FROM refresh_tokens;
SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;
SELECT * FROM cart;
SELECT * FROM reviews;
