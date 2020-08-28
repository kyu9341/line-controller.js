const  { insertLine, deleteLine, updateLine, selectLine, NEWLINE } = require('../lineEditor');

const WRITE_DIR = 'files/';
const TARGET_WORD = '3085';
const TARGET_FILE = 'files/algorithm3085.md';

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
        const selected = selectLine(TARGET_FILE, 1, 8);
        expect(SELECT_LINE_TEST).toEqual(selected);
    })
    it("insertLine", async () => {
        await insertLine(WRITE_DIR, TARGET_WORD, 1, 'insert', 'insert2');
        const selected = selectLine(TARGET_FILE, 1, 2);
        expect(`insert${NEWLINE}insert2`).toEqual(selected);
    })
    it("updateLine", async () => {
        await updateLine(WRITE_DIR, TARGET_WORD, 1, 'update');
        const selected = selectLine(TARGET_FILE, 1);
        expect('update').toEqual(selected);
    })
    it("deleteLine", async () => {
        await deleteLine(WRITE_DIR, TARGET_WORD, 1, 2);
        const selected = selectLine(TARGET_FILE, 1);
        expect('---').toEqual(selected);
    })
})

