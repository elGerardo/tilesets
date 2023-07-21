import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Field from './Field'
import Geometry from './Geometry'

export default class Feature extends BaseModel {
  public static table = 'features'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public tileset_id: string

  @column()
  public type: string

  @hasMany(() => Field, { foreignKey: "feature_id" })
  public properties: HasMany<typeof Field>

  @hasOne(() => Geometry, { foreignKey: "feature_id" })
  public geometry: HasOne<typeof Geometry>
}
