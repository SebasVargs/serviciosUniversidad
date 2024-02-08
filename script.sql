CREATE DATABASE servicios;

Create table usuario(
	id INT(12) UNIQUE NOT NULL,
	name varchar(20) NOT NULL,
	lastName varchar(20) not null,
	email varchar(30) not null,
	age INT(12) not null,
	PRIMARY KEY(id)
);