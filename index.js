let fs        = require('fs');
let xlsx      = require('node-xlsx').default;
let settings  = require('./constants.js');
let generator = [];

// --- Process xlsx
const Sheet   = xlsx.parse(`${__dirname}/Libro2.xlsx`);
let schemas   = Sheet.map((value) => {
    let header = value.data.shift();
    return {
        model     : value.name,
        attributes: header,
        values    : value.data
    };
});
let seeder    = [];
generator     = schemas.map((value) => {
    const getType = (attr) => {
        let change = {
            regx: '',
            type: ''
        };
        if (attr.indexOf('(Int)') > -1) {
            change.regx = new RegExp(/ \(Int\)/g);
            change.type = ':number';
        }
        else if (attr.indexOf('(Str)' > -1)) {
            change.regx = new RegExp(/ \(Str\)/g);
            change.type = ':string'
        }
        const {regx, type} = change;
        return `${attr.replace(regx, type)}`;
    };
    generator     = `--name ${value.model}`;
    generator    += ` --attributes ${value.attributes.map(attr => getType(attr))}`;
    return generator;
});

// --- build script
let {name, action, env, pathModel, pathMigration, pathConfig, pathSeeders} = settings;

let fileName = `install.db.${name}.js`;
let prefix   = 'const { exec } = require(\'child_process\');';
let db       = `exec('npx sequelize-cli ${pathConfig} ${action('db')}');`;
let models   = `exec('npx sequelize-cli ${action('model')} ${pathModel}  ${pathMigration} ${pathConfig} `;
let migrate  = `exec('npx sequelize-cli ${pathConfig} ${env('dev')} ${pathMigration} ${action('migrate')}');`;
let seeders  = `exec('npx sequelize-cli ${pathConfig} ${env('dev')}  ${action('seed')}');`;
let seederFile = Sheet.map(value =>`sequelize seed:create ${pathSeeders} --name ${value.name} \n`).join("");
let script   = generator.map(ln => `${models} ${ln}');`);

// --- Create File
let scriptGenerate = `${prefix} \n${db} \n${script.join('\n')} \n${migrate} \n${seeders} \n${seederFile}`;
fs.writeFileSync(`./Scripts/${fileName}`, scriptGenerate, 'utf-8');

// --- Show result
console.log(scriptGenerate);
