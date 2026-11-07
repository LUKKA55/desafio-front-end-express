import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity({ name: "disciplina" })
export class DisciplinaEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string

    @Column({ type: "varchar", length: 10 })
    codigo!: string

    @Column({ type: "varchar", length: 100 })
    nome!: string

    @Column({ type: "integer", name: "carga_horaria" })
    cargaHoraria!: number
}