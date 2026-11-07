import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity({ name: "turma" })
export class TurmaEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string

    @Column({ type: "bigint", name: "disciplina_id" })
    disciplinaId!: string

    @Column({ type: "bigint", name: "professor_id" })
    professorId!: string

    @Column({ type: "smallint", name: "dia_semana" })
    diaSemana!: number

    @Column({ type: "smallint" })
    turno!: number

    @Column({ type: "integer" })
    vagas!: number

    @Column({ type: "varchar", length: 6 })
    semestre!: string
}