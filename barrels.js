const glob = require('glob');
const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');

const writeFileAsync = promisify(fs.writeFile);
const exportTemplate = (from) => {
    return `export * from '${from}';\n`;
}

const globOpt = {
    ignore: ['node_modules/**'],
    cwd: process.env.PWD,
};

const generatorComment = '// barrels\n';
const importPath = (dir) => (file) => {
    const relative = path.relative(dir, file);
    return './' + relative.substr(0, relative.length - path.extname(relative).length);
};

const writeIndex = async (p, content) => {
    const realPath = path.resolve(p);
    writeFileAsync(realPath, content);
    console.log('CREATE: ' + realPath);
};

const createIndexFile = (dir, exportFiles) => {
    const content = generatorComment + exportFiles.map(importPath(dir))
        .map(exportTemplate)
        .join('');
    const indexPath = path.join(dir, 'index.ts');
    writeIndex(indexPath, content);
}

// create barrels for components/services/directives/pipes/stores
const barrelsForDir = (dir) => {
    const pattern = (dir + '**/*.+(component|service|directive|pipe|query|store).ts');
    glob(pattern, globOpt, (err, matches) => {
        createIndexFile(dir, matches);
    });
}

glob('**/+(components|services|pipes|directives|store)/', globOpt, (err, matches) => {
    matches.forEach(dir => barrelsForDir(dir))
});

// create barrels for module

const barrelsForModule = (moduleFile) => {
    const dir = path.dirname(moduleFile);
    const exportFiles = [moduleFile];
    createIndexFile(dir, exportFiles);
}

const excludeModules = [/app\.module\.ts/, /routing/];
const isExcludeModule = (file) => {
    console.log(file);
    return excludeModules.findIndex(exp => exp.test(file)) > -1;
}
glob('**/*.module.ts', globOpt, (err, matches) => {
    matches.filter(file => isExcludeModule(file) === false)
        .forEach(file => barrelsForModule(file));
});
