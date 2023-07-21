import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TilesetService from 'App/Services/TilesetService';

@inject()
export default class TilesetsController {
    constructor(readonly tilesetService: TilesetService){}
    
    public async index({ response }: HttpContextContract){
        response.status(200).send(await this.tilesetService.get())
    }

    public async find({ response, params }: HttpContextContract){
        response.status(200).send(await this.tilesetService.find(params.tileset_id))
    }

    public async findByLongLat({ response, params }: HttpContextContract){
        response.status(200).send(await this.tilesetService.getMatchedLongLat(params.lng, params.lat))
    }
}