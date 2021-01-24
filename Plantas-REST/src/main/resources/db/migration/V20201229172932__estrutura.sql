create table alelo(
    id_alelo serial primary key not null,
    nm_alelo varchar(40) not null,
    tp_alelo varchar(1) not null
);

create table caracteristica(
    id_caracteristica serial primary key not null,
    nm_caracteristica varchar(40) not null
);

create table caracteristica_to_alelo(
    id_caracteristicatoalelo serial primary key not null,
    id_caracteristica int not null references caracteristica(id_caracteristica),
    id_alelo int not null references alelo(id_alelo),
    id_genotipo int not null references alelo(id_alelo)
);

create table planta(
  id_planta serial not null primary key,
  nm_planta varchar(40) not null,
  nm_filo varchar(40) not null,
  nm_classe varchar(40) not null,
  nm_ordem varchar(40) not null,
  nm_familia varchar(40) not null
);

create table planta_caracteristicas (
    id_plantacaracteristica serial primary key not null,
    id_planta int not null references planta(id_planta),
    id_caracteristica int not null references caracteristica(id_caracteristica)
);