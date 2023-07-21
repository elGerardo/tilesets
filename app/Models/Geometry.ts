import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Geometry extends BaseModel {
  public static table = 'geometries'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public feature_id: string

  @column()
  public type: string

  @column()
  public geom: string
}
