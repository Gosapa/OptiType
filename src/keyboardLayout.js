// src/keyboardLayout.js

// Helper to create a leaf node (actual character)
const char = (c) => ({ type: 'char', label: c, value: c });

// Helper to create a category node
const group = (label, children) => ({ type: 'group', label, children });

export const KOREAN_ROOT = {
  type: 'root',
  label: 'Start',
  children: [
    group('Consonants (자음)', [
      group('ㄱ - ㅅ', [
        char('ㄱ'), char('ㄴ'), char('ㄷ'), char('ㄹ'), char('ㅁ'), char('ㅂ'), char('ㅅ')
      ]),
      group('ㅇ - ㅎ', [
        char('ㅇ'), char('ㅈ'), char('ㅊ'), char('ㅋ'), char('ㅌ'), char('ㅍ'), char('ㅎ')
      ])
    ]),
    group('Vowels (모음)', [
      group('ㅏ - ㅗ', [
        char('ㅏ'), char('ㅑ'), char('ㅓ'), char('ㅕ'), char('ㅗ'), char('ㅛ')
      ]),
      group('ㅜ - ㅣ', [
        char('ㅜ'), char('ㅠ'), char('ㅡ'), char('ㅣ'), char('ㅐ'), char('ㅔ')
      ])
    ]),
    group('Commands', [
      char('SPACE'),
      char('BACKSPACE'),
      char('CLEAR')
    ])
  ]
};

export const ENGLISH_ROOT = {
  type: 'root',
  label: 'Start',
  children: [
    group('A - M', [
        group('A - G', [char('A'), char('B'), char('C'), char('D'), char('E'), char('F'), char('G')]),
        group('H - M', [char('H'), char('I'), char('J'), char('K'), char('L'), char('M')])
    ]),
    group('N - Z', [
        group('N - T', [char('N'), char('O'), char('P'), char('Q'), char('R'), char('S'), char('T')]),
        group('U - Z', [char('U'), char('V'), char('W'), char('X'), char('Y'), char('Z')])
    ]),
    group('Commands', [
      char('SPACE'), char('BACKSPACE'), char('CLEAR')
    ])
  ]
};
