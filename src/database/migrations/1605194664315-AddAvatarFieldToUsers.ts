import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUsers1605194664315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'avatar',
      type: 'varchar', // nunca guardar a imgem de fato no DB, apenas o caminho.
      isNullable: true, // por conta dos dados antigos.
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
