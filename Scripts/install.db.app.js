const { exec } = require('child_process'); 
exec('npx sequelize-cli --config ./config/config.app.json db:create'); 
exec('npx sequelize-cli model:generate --models-path ./models/db.app  --migrations-path ./migrations/db.app --config ./config/config.app.json  --name SYS_Z000 --attributes ANCESTOR:number,CODE:number,PARENT:number,ORDER:number,VALUE:string,DESCRIPTION:string,PROPERTY:string');
exec('npx sequelize-cli model:generate --models-path ./models/db.app  --migrations-path ./migrations/db.app --config ./config/config.app.json  --name SYS_Z001 --attributes ANCESTOR:number,CODE:number,PARENT:number,ORDER:number,VALUE:string,DESCRIPTION:string,PROPERTY:string');
exec('npx sequelize-cli model:generate --models-path ./models/db.app  --migrations-path ./migrations/db.app --config ./config/config.app.json  --name SYS_Z003 --attributes ANCESTOR:number,CODE:number,PARENT:number,ORDER:number,VALUE:string,DESCRIPTION:string,PROPERTY:string'); 
exec('npx sequelize-cli --config ./config/config.app.json --env development --migrations-path ./migrations/db.app db:migrate'); 
exec('npx sequelize-cli --config ./config/config.app.json --env development  db:seed:all');