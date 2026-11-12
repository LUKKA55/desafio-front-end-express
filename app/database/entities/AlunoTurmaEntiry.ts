import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AlunoEntity } from "./alunoEntity.js"
import { TurmaEntity } from "./turmaEntity.js"

@Entity({ name: "aluno_turma" })
export class AlunoTurmaEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string

    @Column({ type: "bigint", name: "aluno_id" })
    alunoId!: string

    @Column({ type: "bigint", name: "turma_id" })
    turmaId!: string

    @ManyToOne(() => AlunoEntity)
    @JoinColumn({ name: "aluno_id" })
    aluno!: AlunoEntity

    @ManyToOne(() => TurmaEntity)
    @JoinColumn({ name: "turma_id" })
    turma!: TurmaEntity
}