import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type: "bigint"})
    id!: number

    @Column({ type: "varchar", length: 100 })
    name!: string

    @Column({ type: "varchar", length: 20  })
    password!: string

    @Column({ type: "varchar", length: 10  })
    perfil!: string
}