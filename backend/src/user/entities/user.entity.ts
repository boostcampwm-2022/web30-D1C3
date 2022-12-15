import { StudyRoom } from '../../study-room/entities/studyRoom.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comments.entity';

@Entity('T_USER', { schema: 'tody' })
export class User {
  @Column('varchar', { primary: true, name: 'USER_ID', length: 50 })
  userId: string;

  @Column('varchar', { name: 'USER_PW', nullable: true, length: 100 })
  userPw: string | null;

  @Column('varchar', { name: 'NICKNAME', nullable: true, length: 100 })
  nickname: string | null;

  @Column('varchar', { name: 'SALT', nullable: true, length: 255 })
  salt: string | null;

  @ManyToMany(() => Comment, (Comment) => Comment.Users)
  Comments: Comment[];

  @OneToMany(() => StudyRoom, (studyRoom) => studyRoom.managerId)
  studyRoom: StudyRoom[];
}
