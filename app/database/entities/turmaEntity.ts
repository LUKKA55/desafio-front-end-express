import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import { DisciplinaEntity } from "./disciplinaEntity.js"
import { ProfessorEntity } from "./professorEntity.js"

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

    @ManyToOne(() => DisciplinaEntity)
    @JoinColumn({ name: "disciplina_id" })
    disciplina!: DisciplinaEntity

    @ManyToOne(() => ProfessorEntity)
    @JoinColumn({ name: "professor_id" })
    professor!: ProfessorEntity
}