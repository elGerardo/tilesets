import { BaseModel, HasMany, HasOne, column, hasMany, hasOne, scope } from '@ioc:Adonis/Lucid/Orm'
import Feature from './Feature'
import Geometry from './Geometry'
import TypesFilter from 'App/Filters/Tilesets/TypesFilter'
import ListDTO from 'App/DTOs/Shared/ListDTO'

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

  @hasOne(() => Geometry, { foreignKey: 'tileset_id' })
  public geometry: HasOne<typeof Geometry>

  public static filter = scope<typeof Tileset>((query, params: ListDTO) => {
    return {
      ...(params.filters.has('types') && { types: new TypesFilter().filter(query, params.filters.get('types')) } )
    }
  })
}
