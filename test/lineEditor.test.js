const  { insertLine, deleteLine, updateLine, selectLine } = require('../lineEditor');

const WRITE_DIR = '../files\\';
const TARGET_WORD = '3085';
const TARGET_LINE_NUM = 8;
const INSERT_LINE = `tags:`;
const INSERT_LINE2 = `\t- Algorithm`;

// insertLine(WRITE_DIR, TARGET_WORD, TARGET_LINE_NUM, INSERT_LINE, INSERT_LINE2)
// .then(() => deleteLine(WRITE_DIR, TARGET_WORD, 8, 2))
// .then(() => updateLine(WRITE_DIR, TARGET_WORD, 1, '---'))
// console.log(selectLine('files/algorithm3055.md', 1, 8));

const SELECT_LINE_TEST = 
`---
layout: post
title: "백준 3085번 사탕 게임"
subtitle: "Baekjoon algorithm"
date: 2020-02-24 09:51:12
author: kwon
categories: algorithm
---`;

describe("test lineEditor", () => {
    it("selectLine", () => {
        const selected = selectLine('files/algorithm3085.md', 1, 8);
        const origin = SELECT_LINE_TEST.split('\n');
        const target = selected.split('\r\n');
        console.log(origin);
        console.log(target);
        expect(origin.every((_, idx) => target[idx] === origin[idx])).toBe(true);
    })
})

