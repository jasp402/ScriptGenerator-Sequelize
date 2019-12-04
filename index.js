let fs = require('fs');
let xlsx = require('node-xlsx').default;

let schemas = [];
const workSheetsFromFile = xlsx.parse(`${__dirname}/Libro2.xlsx`);

schemas = workSheetsFromFile.map((value) => {
    let header = value.data.shift();
    return {
        model: value.name,
        attributes: header,
        values: value.data[0]
    };
});

let generator = [];
generator = schemas.map((value, index) => {
    const getType = (attr) => {
        let change = {
            regx: '',
            type: ''
        };

        if(attr.indexOf('(Int)') >-1){
            change.regx = new RegExp(/ \(Int\)/g);
            change.type = ':number';
        }

        else if(attr.indexOf('(Str)'>-1)){
            change.regx = new RegExp(/ \(Str\)/g);
            change.type = ':string'
        }

        const {regx, type} = change;
        return `${attr.replace(regx, type)}`;
    };
    generator = `--name ${value.model}`;
    generator += ` --attributes ${value.attributes.map(attr => getType(attr) )}`
    return generator;
});

// add properties
let script  = generator.map(ln =>`exec('npx sequelize-cli model:generate  --models-path ./models/db.system  --migrations-path ./migrations/db.system ${ln}');`);
fs.writeFileSync('./Scripts/db.js', 'const { exec } = require(\'child_process\');\n'+script.join('\n'), 'utf-8');

console.log(generator);