CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- primeiro criar a tabela categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  -- devemos informar ao DB que essa coluna db faz referencia a tabela categories
  FOREIGN KEY(category_id) REFERENCES categories(id) -- criamos uma chave estrangeira, informamos qual coluna sera referencia na 2° tabela, informar qual a tabela referencia e qual coluna dessa tabela
);
