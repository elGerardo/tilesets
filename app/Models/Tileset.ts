import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Feature from './Feature'

export default class Tileset extends BaseModel {
  public static table = 'tilesets'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public category: string

  @column()
  public type: string

  @hasMany(() => Feature, { foreignKey: 'tileset_id' })
  public features: HasMany<typeof Feature>
}
