import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ListDTO from 'App/DTOs/Shared/ListDTO';
import TilesetService from 'App/Services/TilesetService';

@inject()
export default class TilesetsController {
    constructor(readonly tilesetService: TilesetService){}
    
    public async index({ request, response }: HttpContextContract){
        const filters = await ListDTO.handle(request.qs())
        response.status(200).send(await this.tilesetService.get(filters))
    }

    public async find({ request, response, params }: HttpContextContract){
        response.status(200).send(await this.tilesetService.find(params.tileset_id, request.qs().show_geometry))
    }

    public async findByLongLat({ request, response, params }: HttpContextContract){
        response.status(200).send(await this.tilesetService.getMatchedLongLat(params.lng, params.lat, request.qs().show_geometry))
    }

    public async findPointOrLine({ request, response, params }: HttpContextContract){
        let radius = "5000"
        if(request.qs().radius !== undefined) radius = request.qs().radius
        response.status(200).send(await this.tilesetService.getPointOrLine(params.tileset_id, params.lng, params.lat, radius))
    }
}
