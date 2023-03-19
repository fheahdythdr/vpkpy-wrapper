const { exec } = require('child_process');
const { basename, parse, dirname, join } = require('path');
const fs = require('fs');

const vpkpy = {}

vpkpy.exec = function(str, cb) {
    return exec('vpk ' + str, cb);
};

vpkpy.create = function(file, opts) {
    const extwith = basename(file);
    const vpk = parse(extwith).name + '.vpk'
    const dir = dirname(file);
    this.exec('-c ' + file + ' ' + vpk + ' ' + opts);
    return join(dir, vpk);
}

vpkpy.createVersion = function(file, ver, opts) {
    const extwith = basename(file);
    const vpk = parse(extwith).name + '.vpk'
    const dir = dirname(file);
    this.exec(`-c ${file} ${vpk} -cv ${ver} ${opts ?? ''}`);
    return join(dir, vpk)
}

vpkpy.createAndMove = function(file, ver, move, opts) {
    const respath = this.createVersion(file, ver, opts);
    setTimeout(() => {
        fs.copyFileSync(respath, move);
    }, 2000)
}

vpkpy.extract = function(file, out, opts) {
    this.exec(`${file} -x ${out} ${opts}`);
}

vpkpy.test = function(file) {
    return new Promise((resolve) => {
        this.exec(`-t ${file}`, (err, stdout, stderr) => {
            resolve({err: err, files: stdout.split('\r\n'), stderr: (stderr.split('\r\n') ?? "")});
        });
    })
}

vpkpy.list = function(file) {
    return new Promise((resolve) => {
        this.exec(`-l ${file}`, (err, stdout, stderr) => {
            resolve({err: err, files: stdout.split('\r\n'), stderr: (stderr.split('\r\n') ?? "")});
        });
    })
    
}

vpkpy.listStats = function(file) {
    return new Promise((resolve) => {
        this.exec(`-la ${file}`, (err, stdout, stderr) => {
            resolve({err: err, files: stdout.split('\r\n'), stderr: (stderr.split('\r\n') ?? "")});
        });
    })
    
}

module.exports = vpkpy
