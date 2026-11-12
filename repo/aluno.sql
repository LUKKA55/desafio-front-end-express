Create Table Aluno (
    "id" bigint primary key GENERATED ALWAYS AS IDENTITY,
    idUser bigint not null,
    codMatricula varchar(10),
    nome varchar(100),
    email varchar(100),
    constraint fk_idUser foreign key (idUser) references "user"(id)
);

CREATE TABLE aluno_turma (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    aluno_id bigint NOT NULL,
    turma_id bigint NOT NULL,
    CONSTRAINT fk_aluno_turma_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(id),
    CONSTRAINT fk_aluno_turma_turma FOREIGN KEY (turma_id) REFERENCES turma(id),
    CONSTRAINT uq_aluno_turma UNIQUE (aluno_id, turma_id)
);