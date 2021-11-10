
let { spawn } = require('child_process'),

git = spawn('git', ['log', '--format=%s']),
buf = Buffer.alloc(0);

git.stdout.on('data', (data) => {
    buf = Buffer.concat([buf, data])
    console.log(buf);
});
// if process error
git.stderr.on('data', (data) => {
    console.log(data.toString());
});
// when process is done
git.on('close', (code) => {
    // convert to string and split based on end of line
    let subjects = buf.toString().split('\n');
    // pop the last empty string element
    subjects.pop();
    // log all subject names
    subjects.forEach((sub) => {
        console.log(sub);
    });
});