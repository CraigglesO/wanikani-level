// import fs from 'fs'
import path from 'path'
import { EventEmitter } from 'events'
import kuromoji from 'kuromoji'
import Kuroshiro from 'kuroshiro'
import levelup from 'levelup'
import leveldown from 'leveldown'

import RULES from './ruleSet.json'

const debug = require('debug')('wanikani-level')

type Word = {
  word_id: number,
  surface_form: string,
  pos: [string],
  furigana: string,
  wanikaniLevel: number,
  wanikaniId: number
}

class WanikaniLevel extends EventEmitter {
  db: levelup
  ready: boolean
  tokenizer: kuromoji
  getLevel: function
  constructor () {
    super()
    debug('instantiating WanikaniLevel')
    this.db = levelup(leveldown(path.join(__dirname, '../waniKaniVocab.db')))
    this.ready = false
    this.createTokenizer()
  }

  createTokenizer () {
    const self = this
    kuromoji.builder({ dicPath: path.join(__dirname, '../dict') }).build((err, tokenizer) => {
      if (err) throw Error('kuromiji failed to build tokenizer')
      self.tokenizer = tokenizer
      this.ready = true
      this.emit('ready')
    })
  }

  getLevel (input: string): [boolean, Array<Word>] {
    debug('getLevel')
    if (!Kuroshiro.Util.hasJapanese(input)) {
      return new Error('The entire string must be in the Japanese langauge')
    }
    return this._getLevels(input)
  }

  async _getLevels (input: string): [boolean, Array<Word>] {
    debug('_getLevels')
    let pass = true
    let totalWords = 0
    let totalKnown = 0
    let highestLevel = 0
    // create sentence first
    let tokenSentence: [Word] = this.tokenizer.tokenize(input)
    for (let i = 0; i < tokenSentence.length; i++) {
      let token = tokenSentence[i]
      let replaceToken = null
      if (token.basic_form !== token.surface_form) { // Redo the token using the basic_from
        replaceToken = this.tokenizer.tokenize(token.basic_form)[0]
      }
      if (this._passesRules(token.surface_form, token.pos, token.pos_detail_1, token.pos_detail_2, token.pos_detail_3)) {
        totalWords++
        let wkWord = await this.db.get(token.word_id).catch(_ => {})
        if (!wkWord && replaceToken) { // try again, maybe it just needs to be in the right form
          wkWord = await this.db.get(replaceToken.word_id).catch(_ => {})
        }
        if (wkWord) {
          wkWord = JSON.parse(wkWord.toString('utf8'))
          tokenSentence[i].wanikaniId = wkWord.id
          tokenSentence[i].wanikaniLevel = wkWord.level
          tokenSentence[i].wanikaniForm = wkWord.originalForm
          tokenSentence[i].wanikaniMeaning = wkWord.meaning
          tokenSentence[i].wanikaniLink = wkWord.link
          totalKnown++
          if (wkWord.level > highestLevel) highestLevel = wkWord.level
        } else {
          tokenSentence[i].wanikaniLevel = -1
          tokenSentence[i].wanikaniId = -1
          pass = false
        }
      } else {
        tokenSentence[i].wanikaniLevel = 0
        tokenSentence[i].wanikaniId = 0
      }
    }

    return { tokenSentence, pass, totalKnown, totalWords, coverage: (totalWords) ? parseFloat((totalKnown / totalWords).toFixed(2)) : 0, highestLevel }
  }

  _passesRules (surfaceForm, pos, pos1, pos2, pos3) {
    // test if grammar or unfamiliar noun
    if (RULES[pos].skip || RULES[pos1].skip || RULES[pos2].skip || RULES[pos3].skip) {
      return false
    }
    // if verb suffix
    if (pos === '動詞' && pos1 === '接尾') return false
    // test if katakana word
    let katakanaWord = true
    for (let i = 0; i < surfaceForm.length; i++) {
      if (!Kuroshiro.Util.isKatakana(surfaceForm[i])) {
        katakanaWord = false
      }
    }
    if (katakanaWord) return false
    // if a number
    if (!isNaN(surfaceForm)) return false

    return true
  }
}

export default WanikaniLevel
