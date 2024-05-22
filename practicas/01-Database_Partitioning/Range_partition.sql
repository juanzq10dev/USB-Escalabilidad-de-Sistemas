CREATE TABLE books (
	id INT NOT NULL, 
    title VARCHAR(30), 
    author VARCHAR(30),
    created DATE NOT NULL DEFAULT '1970-01-01',
    UNIQUE KEY(id)
)
PARTITION BY RANGE (id) (
    PARTITION p0 VALUES LESS THAN (200),
    PARTITION p1 VALUES LESS THAN (400),
    PARTITION p2 VALUES LESS THAN (600),
    PARTITION p3 VALUES LESS THAN (800),
    PARTITION p4 VALUES LESS THAN (1000), 
    PARTITION p5 VALUES LESS THAN MAXVALUE
);

INSERT INTO books (id, title, author, created)
VALUES 
    (100, 'Book1', 'Author1', '2024-05-15'),
    (150, 'Book2', 'Author2', '2024-05-15'),
    (250, 'Book3', 'Author3', '2024-05-15'),
    (350, 'Book4', 'Author4', '2024-05-15'),
    (450, 'Book5', 'Author5', '2024-05-15'),
    (550, 'Book6', 'Author6', '2024-05-15'),
    (650, 'Book7', 'Author7', '2024-05-15'),
    (750, 'Book8', 'Author8', '2024-05-15'),
    (850, 'Book9', 'Author9', '2024-05-15'),
    (950, 'Book10', 'Author10', '2024-05-15'),
    (1050, 'Book11', 'Author11', '2024-05-15'),
    (2000, 'Book12', 'Author12', '2024-05-15');
    
SELECT * FROM books;

SELECT * FROM books PARTITION (p0);
SELECT * FROM books PARTITION (p1);
SELECT * FROM books PARTITION (p2);
SELECT * FROM books PARTITION (p3);
SELECT * FROM books PARTITION (p4);
SELECT * FROM books PARTITION (p5);
