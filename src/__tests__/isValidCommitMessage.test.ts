import isValidCommitMessage from '../isValidCommitMesage'
import { describe, test, expect } from '@jest/globals'

describe('isValidCommitMessage tests', () => {
  describe('should be able to correctly validate the commit message', () => {
    test.each<[string, boolean]>([
      ['chore(nice-one): doing this right', true],
      ['feat!: change all the things', true],
      ['fix(user)!: a fix with some breaking changes', true],
      ['fix: menu must open on shortcut press', true],
      ['something: should not work', false],
      ['fixes something', false],
      ['🚧 fix: menu must open on shortcut press', true],
      ['fix(menus): menu must open on shortcut press', true],
      ['🚧 fix(menus): menu must open on shortcut press', true],
      ['🚧 fixing something', false],
      ['🚧 something: should not work', false],
      ['chorz: 123', false],
      ["Merge branch 'master' into feature/branch", true],
      ["Revert 'fix: menu must open on shortcut press'", true],
      ['f1i1234567890x3: menu must open on shortcut press', false],
    ])('%s', (msg, expected) => {
      expect(isValidCommitMessage(msg)).toBe(expected)
    })
  })
})
