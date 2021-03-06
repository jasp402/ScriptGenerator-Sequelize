const { exec } = require('child_process'); 
exec('npx sequelize-cli --config ./config/config.system.json db:create'); 
exec('npx sequelize-cli model:generate --models-path ./models/db.system  --migrations-path ./migrations/db.system --config ./config/config.system.json  --name SYS_Z000 --attributes ANCESTOR:number,CODE:number,PARENT:number,ORDER:number,VALUE:string,DESCRIPTION:string,PROPERTY:string');
exec('npx sequelize-cli model:generate --models-path ./models/db.system  --migrations-path ./migrations/db.system --config ./config/config.system.json  --name SYS_Z001 --attributes ANCESTOR:number,CODE:number,PARENT:number,ORDER:number,VALUE:string,DESCRIPTION:string,PROPERTY:string');
exec('npx sequelize-cli model:generate --models-path ./models/db.system  --migrations-path ./migrations/db.system --config ./config/config.system.json  --name SYS_Z003 --attributes ANCESTOR:number,CODE:number,PARENT:number,ORDER:number,VALUE:string,DESCRIPTION:string,PROPERTY:string'); 
exec('npx sequelize-cli --config ./config/config.system.json --env development --migrations-path ./migrations/db.system db:migrate'); 
exec('npx sequelize-cli --config ./config/config.system.json --env development  db:seed:all'); 
sequelize seed:create --seeders-path ./seeders/db.system --name SYS_Z000 
sequelize seed:create --seeders-path ./seeders/db.system --name SYS_Z001 
sequelize seed:create --seeders-path ./seeders/db.system --name SYS_Z003 
