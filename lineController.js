const fs = require('fs');
const os = require('os')
const NEWLINE = os.EOL;
const UTF_8 = 'utf8';

/**
 * @description 원하는 디렉토리 내부의 파일 목록을 읽어온다.
 * @param {String} dirPath 읽어올 디렉토리 경로
 * @return {Array} 파일 목록을 배열로 리턴
 */
const readFileList = (dirPath) => {
    return fs.readdirSync(dirPath, (err, fileList) => {
        if (err) console.log('Error :', err);
    });
}

/**
 * @description 파일 목록에서 파일명에 특정 문자열이 포함된 파일들의 목록을 반환한다.
 * @param {Array} fileList 전체 파일 목록
 * @param {String} targetWord 특정 문자열
 * @return {Array} targetWord가 파일명에 포함된 파일 목록 리턴
 */
const filterFileList = (fileList, targetWord) => {
    return fileList.filter(fileName => fileName.indexOf(targetWord) > -1);
}

/**
 * @description 파일 내용을 동기적으로 읽어오는 함수
 * @param {String} fileName 파일명
 * @param {String} targetDir 디렉토리 경로
 * @return {String} 읽어온 파일 내용
 */
const readFileContents = (fileName, targetDir = '') => {
    return fs.readFileSync(targetDir + fileName, UTF_8, (err, contents) => {
        if (err) console.log('Error :', err);
    });
}

/**
 * @description 특정 line에 lines을 삽입한다.
 * @param {String} fileContent 기존 파일 내용
 * @param {Number} targetLine 삽입할 line number
 * @param {Array} lines 삽입될 line들 목록
 * @return {String} 삽입된 결과 문자열을 리턴
 */
const insert = (fileContent, targetLine, lines) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(targetLine - 1, 0, ...lines);
    return contentArr.join(NEWLINE);
}

/**
 * @description 특정 line에 lines을 삽입한다.
 * @param {String} fileContent 기존 파일 내용
 * @param {Number} startLine 제거할 시작 line number
 * @param {Number} deleteCount 제거될 line 개수
 * @return {String} line이 제거된 결과 문자열을 리턴
 */
const remove = (fileContent, startLine, deleteCount) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(startLine - 1, deleteCount);
    return contentArr.join(NEWLINE);
}

/**
 * @description 특정 line을 수정한다.
 * @param {String} fileContent 기존 파일 내용
 * @param {Number} targetLine 수정할 line number
 * @param {String} text 수정할 내용
 * @return {String} 수정된 결과 문자열을 리턴
 */
const update = (fileContent, targetLine, text) => {
    let contentArr = fileContent.split(NEWLINE);
    contentArr.splice(targetLine - 1, 1, text);
    return contentArr.join(NEWLINE);
}

/**
 * @description 특정 lines을 조회한다.
 * @param {String} fileContent 기존 파일 내용
 * @param {Number} targetLine 조회할 line number
 * @param {Number} selectCount 조회할 line 개수
 * @return {String} 조회된 결과 문자열을 리턴
 */
const select = (fileContent, targetLine, selectCount) => {
    let contentArr = fileContent.split(NEWLINE);
    return contentArr.filter((_, idx) =>
        idx >= targetLine - 1 && idx < targetLine - 1 + selectCount).join(NEWLINE);
}

/**
 * @description targetDir에 있는 파일들 중 파일명에 targetWord가 포함되는 파일에 원하는 line들을 삽입한다.
 * @param {String} targetDir 원하는 디렉토리의 경로 ex) 'files/'
 * @param {String} targetWord 파일명에 포함된 원하는 단어
 * @param {Number} targetLine 삽입하고 싶은 라인 번호
 * @param  {...String} lines 삽입하고 싶은 문자열 (여러 문자열 가능)
 * @return {Promise} 수행된 프로미스. resolve에 삽입된 결과 파일의 내용이 담긴다.
 */
const insertLine = (targetDir, targetWord, targetLine, ...lines) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName, targetDir);
            const result = insert(fileContents, targetLine, lines);
            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

/**
 * @description targetDir에 있는 파일들 중 파일명에 targetWord가 포함되는 파일에 원하는 line을 지운다.
 * @param {String} targetDir 원하는 디렉토리의 경로 ex) 'files/'
 * @param {String} targetWord 파일명에 포함된 원하는 단어
 * @param {Number} targetLine 삭제하고 싶은 라인 번호
 * @param {Number} deleteCount 삭제를 원하는 라인 수
 * @return {Promise} 수행된 프로미스. resolve에 목표 라인이 제거된 결과 파일의 내용이 담긴다.
 */
const deleteLine = (targetDir, targetWord, targetLine, deleteCount = 1) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName, targetDir);
            const result = remove(fileContents, targetLine, deleteCount)

            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

/**
 * @description targetDir에 있는 파일들 중 파일명에 targetWord가 포함되는 파일에 원하는 line을 수정한다.
 * @param {String} targetDir 원하는 디렉토리의 경로 ex) 'files/'
 * @param {String} targetWord 파일명에 포함된 원하는 단어
 * @param {Number} targetLine 수정하고 싶은 라인 번호
 * @param  {String} text 수정하고 싶은 문자열
 * @return {Promise} 수행된 프로미스. resolve에 수정된 결과 파일의 내용이 담긴다.
 */
const updateLine = (targetDir, targetWord, targetLine, text) => {
    return new Promise((resolve, reject) => {
        const fileList = readFileList(targetDir);
        const filteredList = filterFileList(fileList, targetWord);

        filteredList.forEach(fileName => {
            const fileContents = readFileContents(fileName, targetDir);
            const result = update(fileContents, targetLine, text)

            fs.writeFile(targetDir + fileName, result, UTF_8, err => {
                if (err) console.log('Error :', err);
                resolve(result);
            });
        });
    });
}

/**
 * @description fileName 파일의 원하는 line을 읽어온다.
 * @param {String} fileName 읽고자 하는 파일의 경로 ex) 'files/abc.txt'
 * @param {Number} targetLine 읽고 싶은 시작 line 번호
 * @param {Number} selectCount 읽고자 하는 line 수 (default = 1) optional
 * @return {String} 읽어온 결과 문자열
 */
const selectLine = (fileName, targetLine, selectCount = 1) => {
    const fileContents = readFileContents(fileName);
    const result = select(fileContents, targetLine, selectCount);
    return result;
}

module.exports = { insertLine, deleteLine, updateLine, selectLine, NEWLINE };
