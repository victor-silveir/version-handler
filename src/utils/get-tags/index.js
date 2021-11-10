
const { spawn } = require('child_process');

    const git = spawn('git', ['describe', '--tags']);
    buf = Buffer.alloc(0);

    git.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    git.stdout.on('data', (data) => {
        buf = Buffer.concat([buf, data])

    })

    git.on('error', (error) => console.log(`error: ${error.message}`))

    git.on('close', (code) => {
        if (code) console.log(`Process exit with code: ${code}`);
        let subjects = buf.toString().split();
        console.log(subjects[0]);
    })