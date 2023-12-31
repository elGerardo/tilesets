/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('tilesets/live', () => {
    return { service: "Tilesets Service", version: 1 }
})

Route.group(() => {

    Route.get('/', 'TilesetsController.index')
    Route.get(':tileset_id', 'TilesetsController.find')
    Route.get('lng/:lng/lat/:lat', 'TilesetsController.getByLongLat')
    Route.get(':tileset_id/lng/:lng/lat/:lat', 'TilesetsController.findPointOrLine')
    
}).prefix('tilesets')
