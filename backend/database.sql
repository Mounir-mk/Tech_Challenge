-- CREATE TABLE item (
--   id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   title varchar(255) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

-- Ariston, 35 ans, (conquérant, courageux)
-- Callias, 42 ans, (puissant, vaillant)
-- Demetrius, 29 ans, (stratège, beau)
-- Eudorus, 31 ans, (tragique, philosophe)
-- Gorgias, 46 ans, (savant, intelligent)
-- Helios, 25 ans, (conquérant, courageux)
-- Iphicrates, 40 ans, (puissant, vaillant)
-- Leonidas, 50 ans, (stratège, beau)
-- Menelaus, 48 ans, (tragique, philosophe)
-- Nestor, 60 ans, (savant, intelligent)
-- Odysseus, 39 ans, (conquérant, courageux)
-- Polydeuces, 32 ans, (puissant, vaillant)
-- Theseus, 37 ans, (stratège, beau)
-- Adrastus, 44 ans, (tragique, philosophe)
-- Bellerophon, 30 ans, (savant, intelligent)
-- Castor, 28 ans, (conquérant, courageux)
-- Diomedes, 35 ans, (puissant, vaillant)
-- Empedocles, 50 ans, (stratège, beau)
-- Ganymede, 20 ans, (tragique, philosophe)
-- Heracles, 45 ans, (savant, intelligent)
-- Iolaus, 38 ans, (conquérant, courageux)
-- Leucippus, 43 ans, (puissant, vaillant)
-- Meleager, 36 ans, (stratège, beau)
-- Neoptolemus, 24 ans, (tragique, philosophe)
-- Orpheus, 47 ans, (savant, intelligent)
-- Perseus, 31 ans, (conquérant, courageux)
-- Tantalus, 55 ans, (puissant, vaillant)
-- Ulysses, 41 ans, (stratège, beau)
-- Zenon, 26 ans, (tragique, philosophe)
-- Alastor, 40 ans, (savant, intelligent)
-- Chrysippus, 52 ans, (conquérant, courageux)

-- CREATE TABLE member (
--   id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   name varchar(255) NOT NULL,
--   age int(11) UNSIGNED NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO member (name, age) VALUES 
  ('Ariston', 35),
  ('Callias', 42),
  ('Demetrius', 29),
  ('Eudorus', 31),
  ('Gorgias', 46),
  ('Helios', 25),
  ('Iphicrates', 40),
  ('Leonidas', 50),
  ('Menelaus', 48),
  ('Nestor', 60),
  ('Odysseus', 39),
  ('Polydeuces', 32),
  ('Theseus', 37),
  ('Adrastus', 44),
  ('Bellerophon', 30),
  ('Castor', 28),
  ('Diomedes', 35),
  ('Empedocles', 50),
  ('Ganymede', 20),
  ('Heracles', 45),
  ('Iolaus', 38),
  ('Leucippus', 43),
  ('Meleager', 36),
  ('Neoptolemus', 24),
  ('Orpheus', 47),
  ('Perseus', 31),
  ('Tantalus', 55),
  ('Ulysses', 41),
  ('Zenon', 26),
  ('Alastor', 40),
  ('Chrysippus', 52);

-- CREATE TABLE tag (
--   id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   name varchar(255) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO tag (name) VALUES 
  ('conquérant'),
  ('courageux'),
  ('puissant'),
  ('vaillant'),
  ('stratège'),
  ('beau'),
  ('tragique'),
  ('philosophe'),
  ('savant'),
  ('intelligent'),
  ('chanceux');

-- CREATE TABLE member_tag (
--   id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   member_id int(11) UNSIGNED NOT NULL,
--   tag_id int(11) UNSIGNED NOT NULL,
--   CONSTRAINT member_tag_member_id_fk FOREIGN KEY (member_id) REFERENCES member (id),
--   CONSTRAINT member_tag_tag_id_fk FOREIGN KEY (tag_id) REFERENCES tag (id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO member_tag (member_id, tag_id) VALUES 
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 1),
  (6, 2),
  (7, 3),
  (7, 4),
  (8, 5),
  (8, 6),
  (9, 7),
  (9, 8),
  (10, 9),
  (10, 10),
  (11, 1),
  (11, 2),
  (12, 3),
  (12, 4),
  (13, 5),
  (13, 6),
  (14, 7),
  (14, 8),
  (15, 9),
  (15, 10),
  (16, 1),
  (16, 2),
  (17, 3),
  (17, 4),
  (18, 5),
  (18, 6),
  (19, 7),
  (19, 8),
  (20, 9),
  (20, 10),
  (21, 1),
  (21, 2),
  (22, 3),
  (22, 4),
  (23, 5),
  (23, 6),
  (24, 7),
  (24, 8),
  (25, 9),
  (25, 10),
  (26, 1),
  (26, 2),
  (27, 3),
  (27, 4),
  (28, 5),
  (28, 6),
  (29, 7),
  (29, 8),
  (30, 9),
  (30, 10),
  (31, 1),
  (31, 2);