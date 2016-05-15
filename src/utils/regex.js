// RegExp

export const RE_USERNAME = [/^[a-z]{4,20}$/, '只能包含小写英文字母']

export const RE_PASSWORD = [/^[`~!@#$%^&*_+=,.;'?:"()<>{}\-\/\[\]\\ 0-9a-zA-Z]{8,20}$/, '字母、数字或标点符号']

// export const RE_PASSWORD = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_+=,.;'<>{}?:"\-\/\[\]\\ ]).*$/
// ^.*                        : Start
// (?=.{8,})                  : Length
// (?=.*[a-zA-Z])             : Letters
// (?=.*\d)                   : Digits
// (?=.*[!@#$%^&*?()\-_+= "]) : Special characters
// .*$                        : End
