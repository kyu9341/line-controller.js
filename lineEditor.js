const fs = require("fs");

const WRITE_DIR = './files\\';
const TARGET_WORD = '3085';
const NEWLINE = '\r\n';

const UTF_8 = 'utf8';
const TARGET_LINE_NUM = 8;
const INSERT_LINE = `tags:`;
const INSERT_LINE2 = `\t- Algorithm`;

const readFileList = (dirPath) => {
    return fs.readdirSync(dirPath, (err, fileList) => {
        if (err) console.log('Error :', err);
    });
}

const filterFileList = (fileList, targetWord) => {
    return fileList.filter(fileName => fileName.indexOf(targetWord) > -1);
}

const readFileContents = (fileName) => {
    return fs.readFileSync(WRITE_DIR + fileName, UTF_8, (err, contents) => {
        if (err) console.log('Error :', err);
    });
}

const insert = (fileContent, targetLine, lines) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(targetLine - 1, 0, ...lines);
    return contentArr;
}

const remove = (fileContent, startLine, deleteCount = 1) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(startLine - 1, deleteCount);
    return contentArr;
}

const update = (fileContent, targetLine, text) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(targetLine - 1, 1, text);
    return contentArr;
}

const insertLine = (targetDir, targetWord, targetLine, ...lines) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName);
            const inserted = insert(fileContents, targetLine, lines);
            const result = inserted.join(NEWLINE);
            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

const deleteLine = (targetDir, targetWord, targetLine, deleteCount) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName);
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
            const fileContents = readFileContents(fileName);
            const updated = update(fileContents, targetLine, text)
            const result = updated.join(NEWLINE);
    
            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

module.exports = { insertLine, deleteLine, updateLine };

insertLine(WRITE_DIR, TARGET_WORD, TARGET_LINE_NUM, INSERT_LINE, INSERT_LINE2)
.then(() => deleteLine(WRITE_DIR, TARGET_WORD, 8, 2))
.then(() => updateLine(WRITE_DIR, TARGET_WORD, 1, '---'))



