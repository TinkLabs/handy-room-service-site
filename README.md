## Development
```
cd htdocs/app/webroot/room-service-app
yarn install
yarn start
```
goto http://localhost:3000


## Deployment
```
cd htdocs/app/webroot/cardlink
yarn install
yarn build
```
goto https://ldev.handy.travel/apis/cardlink

## update translation file
```
gulp translation
```
will generate a translation.ctp under `View/RoomServiceApp/`