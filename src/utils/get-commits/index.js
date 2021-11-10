
const { spawn } = require('child_process');
const findTagCommit = require('../get-releases');

const getCommits = async () => {

    let git
    let commits = []
    
    const lastCommit = await findTagCommit();
    
    if(lastCommit) {
        git = spawn('git', ['log', '--ancestry-path', `${lastCommit}..HEAD`]);
    } else {   
        git = spawn('git', ['log', '--pretty=oneline']);
    }
    
    buf = Buffer.alloc(0);
    
    git.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        return
    });
    
    git.stdout.on('data', (data) => {
        buf = Buffer.concat([buf, data])
        return
    })
    
    git.on('error', (error) => console.log(`error: ${error.message}`))
    
    return new Promise((res, rej) => {

        git.on('close', () => {
            let subjects = buf.toString().split('\n');
            subjects.pop();
            subjects.forEach((sub) => {
                const hash = sub.split(' ')[0]
                const message = sub.substring(41);
                commits.push({ hash, message })
            });
            res(commits)
        });
    })
};

module.exports = getCommits;


    