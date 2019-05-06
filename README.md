# wanikani-level [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[travis-image]: https://travis-ci.org/CraigglesO/wanikani-level.svg?branch=master
[travis-url]: https://travis-ci.org/CraigglesO/wanikani-level
[npm-image]: https://img.shields.io/npm/v/wanikani-level.svg
[npm-url]: https://npmjs.org/package/wanikani-level
[downloads-image]: https://img.shields.io/npm/dm/wanikani-level.svg
[downloads-url]: https://www.npmjs.com/package/wanikani-level

## About

[Wanikani](https://www.wanikani.com) is a great Japanese SRS system. During the learning process, one would want to start practicing sentences. This module will take a sentence as an input, run it through a [morphological analyzer](https://www.atilika.org/), and respond with all the vocabulary that wanikani will teach you, and the level at which you can read the sentence if at all.

## Notice

This is a first iteration and prone to a few errors. Testing this on [Japanese Core Anki Deck](https://ankiweb.net/shared/info/114060567) I saw about 80% efficiency.

## Install

```sh
# NPM
npm install --save wanikani-level
# Yarn
yarn add wanikani-level
```

## How to use

```js
// ES6
import WanikaniLevel from 'wanikani-level'
// ES5
const WanikaniLevel = require('wanikani-level').default


const testSentence = '京都には寺が多い。'

let wkLevel = new WanikaniLevel()

wkLevel.on('ready', () => {
  wkLevel.getLevel(testSentence)
    .then(res => {
      console.log(res)
    })
})

/*

{ tokenSentence:
   [ { word_id: 2900850,
       word_type: 'KNOWN',
       word_position: 1,
       surface_form: '京都',
       pos: '名詞',
       pos_detail_1: '固有名詞',
       pos_detail_2: '地域',
       pos_detail_3: '一般',
       conjugated_type: '*',
       conjugated_form: '*',
       basic_form: '京都',
       reading: 'キョウト',
       pronunciation: 'キョート',
       wanikaniId: 3351,
       wanikaniLevel: 12,
       wanikaniForm: '京都',
       wanikaniMeaning: 'Kyoto',
       wanikaniLink: '/vocabulary/%E4%BA%AC%E9%83%BD' },
     { word_id: 92030,
       word_type: 'KNOWN',
       word_position: 3,
       surface_form: 'に',
       pos: '助詞',
       pos_detail_1: '格助詞',
       pos_detail_2: '一般',
       pos_detail_3: '*',
       conjugated_type: '*',
       conjugated_form: '*',
       basic_form: 'に',
       reading: 'ニ',
       pronunciation: 'ニ',
       wanikaniLevel: 0,
       wanikaniId: 0 },
     { word_id: 93010,
       word_type: 'KNOWN',
       word_position: 4,
       surface_form: 'は',
       pos: '助詞',
       pos_detail_1: '係助詞',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '*',
       conjugated_form: '*',
       basic_form: 'は',
       reading: 'ハ',
       pronunciation: 'ワ',
       wanikaniLevel: 0,
       wanikaniId: 0 },
     { word_id: 1703440,
       word_type: 'KNOWN',
       word_position: 5,
       surface_form: '寺',
       pos: '名詞',
       pos_detail_1: '一般',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '*',
       conjugated_form: '*',
       basic_form: '寺',
       reading: 'テラ',
       pronunciation: 'テラ',
       wanikaniId: 3943,
       wanikaniLevel: 15,
       wanikaniForm: '寺',
       wanikaniMeaning: 'Temple',
       wanikaniLink: '/vocabulary/%E5%AF%BA' },
     { word_id: 92920,
       word_type: 'KNOWN',
       word_position: 6,
       surface_form: 'が',
       pos: '助詞',
       pos_detail_1: '格助詞',
       pos_detail_2: '一般',
       pos_detail_3: '*',
       conjugated_type: '*',
       conjugated_form: '*',
       basic_form: 'が',
       reading: 'ガ',
       pronunciation: 'ガ',
       wanikaniLevel: 0,
       wanikaniId: 0 },
     { word_id: 1550340,
       word_type: 'KNOWN',
       word_position: 7,
       surface_form: '多い',
       pos: '形容詞',
       pos_detail_1: '自立',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '形容詞・アウオ段',
       conjugated_form: '基本形',
       basic_form: '多い',
       reading: 'オオイ',
       pronunciation: 'オーイ',
       wanikaniId: 2754,
       wanikaniLevel: 5,
       wanikaniForm: '多い',
       wanikaniMeaning: 'Many',
       wanikaniLink: '/vocabulary/%E5%A4%9A%E3%81%84' },
     { word_id: 90940,
       word_type: 'KNOWN',
       word_position: 9,
       surface_form: '。',
       pos: '記号',
       pos_detail_1: '句点',
       pos_detail_2: '*',
       pos_detail_3: '*',
       conjugated_type: '*',
       conjugated_form: '*',
       basic_form: '。',
       reading: '。',
       pronunciation: '。',
       wanikaniLevel: 0,
       wanikaniId: 0 } ],
  pass: true,
  totalKnown: 3,
  totalWords: 3,
  coverage: 1,
  highestLevel: 15 }

*/

```

---

## ISC License (ISC)

Copyright 2019 <CraigglesO>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
