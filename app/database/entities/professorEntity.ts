import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity({ name: "professor" })
export class ProfessorEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string

    @Column({ type: "varchar", length: 100 })
    nome!: string

    @Column({ type: "varchar", length: 100 })
    email!: string
}