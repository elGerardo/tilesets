export default class TypesFilter {
    filter(query, params){
        try{
            params = JSON.parse(params)
        }catch(error) { params = JSON.stringify(["MultiPolygon", "MultiLineString", "Point"]) }
        query.whereHas('geometry', builder => {
            builder.whereIn('type', JSON.parse(params))
        })
    }
}