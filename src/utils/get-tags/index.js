const { spawn } = require('child_process')

const getLatestTag = () => {
    let tag = ''

    const git = spawn('git', ['describe', '--tags']);
    buf = Buffer.alloc(0);
    
    git.stderr.on('data', (data) => {
        console.log(`No tags available, generating a new Release`);
        //chamar função de criar primeira release
    });
    
    git.stdout.on('data', (data) => {
        buf = Buffer.concat([buf, data])
    })
    
    git.on('error', (error) => console.log(`error: ${error.message}`))
    
    return new Promise((res, rej) => {
        git.on('close', (code) => {
            tag = buf.toString().split('\n');
            res(tag[0]);
        });
    })
};

module.exports = getLatestTag;