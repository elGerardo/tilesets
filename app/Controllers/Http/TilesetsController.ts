import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TilesetService from 'App/Services/TilesetService';

@inject()
export default class TilesetsController {
    constructor(readonly tilesetService: TilesetService){}
    
    public async index({ response }: HttpContextContract){
        response.status(200).send(await this.tilesetService.get())
    }

    public async find({ request, response, params }: HttpContextContract){
        response.status(200).send(await this.tilesetService.find(params.tileset_id, request.qs().show_geometry))
    }

    public async findByLongLat({ request, response, params }: HttpContextContract){
        response.status(200).send(await this.tilesetService.getMatchedLongLat(params.lng, params.lat, request.qs().show_geometry))
    }
}
