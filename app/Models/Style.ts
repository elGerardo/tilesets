import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
export default class Style extends BaseModel {
  public static table = 'styles'
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public tileset_id: string

  @column()
  public color: string

  @column()
  public opacity: string

  @column()
  public stroke: string

  @column()
  public color_stroke: string

  @column()
  public type: string

  @column()
  public min_zoom: string

  @column()
  public max_zoom: string
}
