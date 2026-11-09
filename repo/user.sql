create table "user" (
    "id" bigint primary key GENERATED ALWAYS AS IDENTITY,
    "name" varchar(100) not null,
    "password" varchar(20) not null,
    perfil varchar(10) not null
)