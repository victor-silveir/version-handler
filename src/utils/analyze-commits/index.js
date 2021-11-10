const getCommits = require("../get-commits");
const getLatestTag = require("../get-tags")

const analyzeCommits = async () => {
    let version = ''
    const tag = await getLatestTag();
    console.log(`a ${tag}`);

    if(!tag) {
        version = '0.0.0';
    } else {
        version = tag;
    }

    let [major, minor, patch] = version.split('.');

    +major === 0 ? major = 1 : major = major;
    
    const commits = await getCommits();

    commits.every((commit) => {
        const title = commit.message.split(':')[0];
        console.log(title)
        switch (title) {
            case 'feat':
                minor = +minor + 1
                return false;
            case 'fix': 
                patch = +patch + 1
        }
        return true
    });

    version = `${major}.${minor}.${patch}`

    console.log(version);


  
}

analyzeCommits()