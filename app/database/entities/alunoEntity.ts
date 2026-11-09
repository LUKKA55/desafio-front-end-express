import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./userEntity.js"

@Entity({ name: "aluno" })
export class AlunoEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: string

    @Column({ type: "bigint", name: "iduser" })
    userId!: string

    @Column({ type: "varchar", length: 10, name: "codmatricula" })
    matricula!: string

    @Column({ type: "varchar", length: 100 })
    nome!: string

    @Column({ type: "varchar", length: 100 })
    email!: string

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "iduser" })
    user!: UserEntity
}
