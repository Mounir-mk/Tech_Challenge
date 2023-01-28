CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

-- Alexandre (30 ans, conquérant, puissant)
-- Aristote (50 ans, savant, philosophe)
-- Démétrios (40 ans, vaillant, stratège)
-- Diogène (70 ans, intrépide, philosophe)
-- Euclide (60 ans, savant, beau)
-- Héraclite (50 ans, philosophe, puissant)
-- Hippocrate (80 ans, savant, vaillant)
-- Platon (70 ans, philosophe, beau)
-- Pythagore (60 ans, savant, conquérant)
-- Socrate (70 ans, philosophe, courageux)
-- Thalès (60 ans, savant, beau)
-- Antigone (25 ans, tragique, courageuse)
-- Cassandre (30 ans, tragique, puissante)
-- Clytemnestre (50 ans, tragique, puissante)
-- Electre (30 ans, tragique, courageuse)
-- Hélène (40 ans, tragique, belle)
-- Iphigénie (20 ans, tragique, courageuse)
-- Médée (40 ans, tragique, puissante)
-- Némésis (40 ans, tragique, puissante)
-- Oreste (30 ans, tragique, courageux)
-- Pénélope (40 ans, tragique, belle)
-- Phèdre (30 ans, tragique, belle)
-- Sémélé (20 ans, tragique, belle)
-- Télémaque (20 ans, tragique, courageux)
-- Agamemnon (50 ans, tragique, puissant)
-- Hector (40 ans, tragique, vaillant)
-- Jason (40 ans, tragique, conquérant)
-- Odysseus (50 ans, tragique, stratège)
-- Theseus (40 ans, tragique, vaillant)
-- Perseus (30 ans, tragique, vaillant)

CREATE TABLE member (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  age int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO member (name, age) VALUES 
  ('Alexandre', 30),
('Aristote', 50),
('Démétrios', 40),
('Diogène', 70),
('Euclide', 60),
('Héraclite', 50),
('Hippocrate', 80),
('Platon', 70),
('Pythagore', 60),
('Socrate', 70),
('Thalès', 60),
('Antigone', 25),
('Cassandre', 30),
('Clytemnestre', 50),
('Electre', 30),
('Hélène', 40),
('Iphigénie', 20),
('Médée', 40),
('Némésis', 40),
('Oreste', 30),
('Pénélope', 40),
('Phèdre', 30),
('Sémélé', 20),
('Télémaque', 20),
('Agamemnon', 50),
('Hector', 40),
('Jason', 40),
('Odysseus', 50),
('Theseus', 40),
('Perseus', 30);

CREATE TABLE tag (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO tag (name) VALUES 
 ('conquérant'),
('courageux'),
('courageuse'),
('puissant'),
('puissante'),
('stratège'),
('vaillant'),
('vaillante'),
('beau'),
('belle'),
('savant'),
('philosophe'),
('tragique');

CREATE TABLE member_tag (
  member_id int(11) UNSIGNED NOT NULL,
  tag_id int(11) UNSIGNED NOT NULL,
  CONSTRAINT member_tag_member_id_fk FOREIGN KEY (member_id) REFERENCES member (id),
  CONSTRAINT member_tag_tag_id_fk FOREIGN KEY (tag_id) REFERENCES tag (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO member_tag (member_id, tag_id) VALUES 
(1, 1),
(1, 3),
(1, 4),
(2, 11),
(2, 12),
(3, 4),
(3, 6),
(4, 3),
(4, 12),
(5, 11),
(5, 9),
(6, 12),
(6, 4),
(7, 11),
(7, 6),
(8, 12),
(8, 3),
(9, 11),
(9, 1),
(10, 12),
(10, 3),
(11, 11),
(11, 9),
(12, 13),
(12, 3),
(13, 13),
(13, 4),
(14, 13),
(14, 3),
(15, 13),
(15, 3),
(16, 13),
(16, 2),
(17, 13),
(17, 3),
(18, 13),
(18, 4),
(19, 13),
(19, 2),
(20, 13),
(20, 9),
(21, 13),
(21, 3),
(22, 13),
(22, 2),
(23, 13),
(23, 1),
(24, 13),
(24, 4),
(25, 13),
(25, 6),
(26, 13),
(26, 4),
(27, 13),
(27, 1),
(28, 13),
(28, 6),
(29, 13),
(29, 4);