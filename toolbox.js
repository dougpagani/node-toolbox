//{{{ DEPENDENCIES:
const fs = require('fs')
//}}}

module.exports = {
    touch: touch,
    wobj: wobj,
    robj: robj,
    argLogger: argLogger
}

//{{{ FUNCTIONS:

// write object to a file
function wobj(anobj, optional_filename) {
    // handling optional args
    var filename
    const def_filename = 'obj.json'
    if (typeof optional_filename != "undefined") {
        filename = optional_filename
    } else {
        filename = def_filename
    }
    // Dont write to file if pre-existing
    if (fs.existsSync(filename)) {
        //throw new Error('WOBJ: File already written!')
        process.emitWarning('File already written')
    } else {
        fs.writeFileSync(filename, JSON.stringify(anobj))
    }
}
// read object from a file
function robj(optional_filename) {
    // handling optional args
    var filename
    const def_filename = 'obj.json'
    if (typeof optional_filename != "undefined") {
        filename = optional_filename
    } else {
        filename = def_filename
    }
    return JSON.parse(fs.readFileSync(filename, 'utf8'))
}
// usage: 
// var myobj = robj('filename')

function argLogger() { 
    console.log('DEBUG: arg parsing')
    process.argv.forEach(function (val, index, array) {
        console.log(`    ${index}: ${val}`);
    });
}

// create an empty file, or just touch one
function touch(fp) {
    fs.closeSync(fs.openSync(fp, 'a'));
}

// Toggle the logger to silence logging in function-calls
// ... put in a "describe" block
// var oldLogger = console.log
// BUG: turns off successful, not pending, tests...
function toggleLogger() {
    beforeEach( () => {
        console.log = function() {}
    })
    afterEach( () => {
        console.log = oldLogger
    })
}

//}}}

