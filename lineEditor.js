const fs = require('fs');
const os = require('os')
const NEWLINE = os.EOL;
const UTF_8 = 'utf8';

const readFileList = (dirPath) => {
    return fs.readdirSync(dirPath, (err, fileList) => {
        if (err) console.log('Error :', err);
    });
}

const filterFileList = (fileList, targetWord) => {
    return fileList.filter(fileName => fileName.indexOf(targetWord) > -1);
}

const readFileContents = (fileName, targetDir = '') => {
    return fs.readFileSync(targetDir + fileName, UTF_8, (err, contents) => {
        if (err) console.log('Error :', err);
    });
}

const insert = (fileContent, targetLine, lines) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(targetLine - 1, 0, ...lines);
    return contentArr;
}

const remove = (fileContent, startLine, deleteCount) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(startLine - 1, deleteCount);
    return contentArr;
}

const update = (fileContent, targetLine, text) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(targetLine - 1, 1, text);
    return contentArr;
}

const select = (fileContent, targetLine, selectCount) => {
    let contentArr = fileContent.split(NEWLINE);
    return contentArr.filter((_, idx) =>
        idx >= targetLine - 1 && idx < targetLine - 1 + selectCount);
}


const insertLine = (targetDir, targetWord, targetLine, ...lines) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName, targetDir);
            const inserted = insert(fileContents, targetLine, lines);
            const result = inserted.join(NEWLINE);
            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

const deleteLine = (targetDir, targetWord, targetLine, deleteCount = 1) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName, targetDir);
            const removed = remove(fileContents, targetLine, deleteCount)
            const result = removed.join(NEWLINE);

            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

const updateLine = (targetDir, targetWord, targetLine, text) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName, targetDir);
            const updated = update(fileContents, targetLine, text)
            const result = updated.join(NEWLINE);

            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

const selectLine = (fileName, targetLine, selectCount = 1) => {
    const fileContents = readFileContents(fileName);
    const selected = select(fileContents, targetLine, selectCount);
    const result = selected.join(NEWLINE);
    return result;
}

module.exports = { insertLine, deleteLine, updateLine, selectLine, NEWLINE };

console.log(NEWLINE);