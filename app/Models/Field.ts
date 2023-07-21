import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Field extends BaseModel {
  public static table = 'fields'

  @column({ isPrimary: true })
  public id: string

  @column()
  public feature_id: string

  @column()
  public name: string

  @column()
  public is_seen: string
  
  @column()
  public value: string
}