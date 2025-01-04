-- Create Listings Table
CREATE TABLE listings (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()), -- UUID for apartment
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    images JSON,
    location VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for updates
);

-- Create Images Table
CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apartment_id CHAR(36), -- Foreign key to listings table
    image_url VARCHAR(255) NOT NULL, -- URL or path to the image
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the image is added
    FOREIGN KEY (apartment_id) REFERENCES listings(id) ON DELETE CASCADE -- Cascade delete images when apartment is deleted
);

-- Create Time Slots Table
CREATE TABLE time_slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration INT NOT NULL
);

-- Create Listing Schedules Table
CREATE TABLE listing_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    listing_id CHAR(36) NOT NULL,
    unavailable_time_slots JSON DEFAULT NULL,  -- booked time slots
    available_days JSON NOT NULL,              -- [Mondays,.., Sundays]
    work_hours JSON NOT NULL,                  -- [12am - 8pm, 9pm - 11pm]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);