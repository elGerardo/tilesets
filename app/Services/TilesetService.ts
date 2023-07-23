import Database from '@ioc:Adonis/Lucid/Database';
import Feature from 'App/Models/Feature';
import Field from 'App/Models/Field';
import Tileset from 'App/Models/Tileset'

export default class TilesetService {
    public async get() {
        const tilesets = await Tileset.all()
        return { data: tilesets }
    }

    public async find(tileset_id: string, show_geometry: "true" | "false") {
        let data = {};

        const tileset = await Tileset.query()
            .where('id', tileset_id)
            .firstOrFail()

        data['tileset'] = tileset.serialize()

        const featureRows = await Feature.query()
            .where('tileset_id', tileset.id)

        data['tileset']['features'] = []

        for (const featureRow of featureRows) {
            const propertyRows = await Field.query()
                .where('feature_id', featureRow.id)

            let properties = {}
            for (const propertyRow of propertyRows) {
                const name: 'name' | any = propertyRow?.name
                const value = propertyRow?.value
                properties = { ...properties, [name]: value }
            }

            let geomData: any = [] 
            if(show_geometry === "true") geomData = await Database.rawQuery('select type, ST_AsGeojson(geom) from geometries where feature_id = ?', [featureRow.id])

            let coorData: any = []
            if (show_geometry === "true") coorData = JSON.parse(geomData.rows[0]['st_asgeojson'])

            data['tileset']['features'].push({
                type: featureRow.type,
                properties,
                ...(show_geometry === "true" && {
                    geometry: {
                        type: coorData['type'] === 'MultiPolygon' ? 'Polygon' : coorData['type'],
                        coordinates: coorData['coordinates'][0]
                    }
                })
            })
        }

        return { ...data['tileset'] }
    }

    public async getMatchedLongLat(lng: string, lat: string, show_geometry: "true" | "false") {
        let geomData: any = []
        if(show_geometry === "true") geomData = await Database.rawQuery(`Select tileset_id, feature_id, type, ST_AsGeojson(geom) from geometries where ST_Within(ST_PointFromText('POINT(${parseFloat(lng)} ${parseFloat(lat)})'), geom)`, [])
        else geomData = await Database.rawQuery(`Select tileset_id, feature_id, type from geometries where ST_Within(ST_PointFromText('POINT(${parseFloat(lng)} ${parseFloat(lat)})'), geom)`, [])
        
        let response: any = []
        for (const geom of geomData.rows) {

            let data = {};

            const tileset = await Tileset.query()
                .where('id', geom.tileset_id)
                .firstOrFail()

            data['tileset'] = tileset.serialize()
            const featureRow = await Feature.query()
                .where('id', geom.feature_id)
                .firstOrFail()

            const propertyRows = await Field.query()
                .where('feature_id', geom.feature_id)

            let properties = {}
            for (const propertyRow of propertyRows) {
                const name: 'name' | any = propertyRow?.name
                const value = propertyRow?.value
                properties = { ...properties, [name]: value }
            }

            let coorData: any = [];
            if (show_geometry === "true") coorData = JSON.parse(geom['st_asgeojson'])

            data['tileset']['features'] = [{
                type: featureRow.type,
                properties,
                ...(show_geometry === "true" && {
                    geometry: {
                        type: geom.type === 'MultiPolygon' ? 'Polygon' : geom['type'],
                        coordinates: coorData['coordinates'][0]
                    }
                })
            }]

            response.push({ ...data['tileset'] })

        }

        return response

    }
}