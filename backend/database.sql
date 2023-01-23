CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

CREATE TABLE member (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO member (name) VALUES ('Alexander'), ('Demetrius'), ('Aristaeus'), ('Ariston'), 
('Calisthenes'), ('Chrysippus'), ('Diogenes'), ('Eurydice'), ('Galen'), ('Helios'), ('Heracles'), 
('Hippolytus'), ('Hyperion'), ('Iolaus'), ('Jason'), ('Leander'), ('Medea'), ('Odysseus'), ('Orpheus'), ('Penelope'), 
('Perseus'), ('Philoctetes'), ('Plato'), ('Procrustes'), ('Prometheus'), ('Pythagoras'), ('Theseus'), ('Timaeus'), 
('Tycho'), ('Zeno');