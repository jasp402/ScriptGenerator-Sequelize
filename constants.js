'use strict';
const db = 'system';
module.exports = Object.freeze({
    name         : db,
    action       : (def) => {
        let act = {
            db     : 'db:create',
            model  : 'model:generate',
            migrate: 'db:migrate',
            seed   : 'db:seed:all'
        };
        return act[def];
    },
    env          : (def) => {
        let env = {
            dev: '--env development',
            pro: '--env production',
            tes: '--env test',
        };
        return env[def];
    },
    pathModel    : '--models-path ./models/db.'+db,
    pathMigration: '--migrations-path ./migrations/db.'+db,
    pathConfig   : '--config ./config/config.'+db+'.json',
    pathSeeders  : '--seeders-path ./seeders/db.'+db,

});