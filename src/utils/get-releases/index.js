const getLatestTag = require("../get-tags");
const { spawn } = require('child_process')

const findTagCommit = async () => {
    let commit = ''
    const tags = await getLatestTag();

    if(!tags) {
        return
    }

    const gitLog = spawn('git', ['log', `grep=${tags}`]);
    buf = Buffer.alloc(0);

    gitLog.stderr.on('data', (data) => {
        console.log(`No commits with tag: ${tags} available, please check your history`);
    });

    gitLog.stdout.on('data', (data) => {
        buf = Buffer.concat([buf, data])
    })

    gitLog.on('error', (error) => console.log(`error: ${error.message}`))

    return new Promise((res, rej) => {
        gitLog.on('close', (code) => {
            let subjects = buf.toString().split('\n');
            commit = subjects[0].substring(0, 7);
        });
        res(commit);
    })
    console.log('a');

};

module.exports = findTagCommit