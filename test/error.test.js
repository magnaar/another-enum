'use strict'

import test from "ava"
import { Enum } from "../another-enum"

test("Forbidden EnumValue names", t => {
    const forbiddenEnumValueNames = [ "get", "getAt", "hasIn", "in", "index", "name", "parse", "stringValue", "toJSON", "toString" ]
    t.plan(forbiddenEnumValueNames.length)
    for (const name of forbiddenEnumValueNames)
        try {
            Enum.Forbidden(name)
            t.fail(`${name} should be forbidden`)
        }
        catch (e) {
            t.is(e.message, `Forbidden."${name}" as EnumValue name is forbidden`)
        }
})

test("Twice the same EnumValue name", t => {
    try {
        Enum.Twice("Twice", "Twice")
        t.fail(`Can't have twice the same EnumValue name`)
    }
    catch (e) {
        t.is(e.message, `"Twice" is already defined in "Twice"`)
    }
})

test("Twice the same EnumValue value", t => {
    try {
        Enum.Twice({ "a": 1, "b": 1 })
        t.fail(`Can't have twice the same EnumValue value`)
    }
    catch (e) {
        t.is(e.message, `The value "1" is already used for "Twice.a"`)
    }
})

test("Error message for twice the same EnumValue value with base", t => {
    try {
        Enum.Colors(16, { R: 0xFF0000, G: 0xFF0000, B: 0x0000FF })
        t.fail(`Can't have twice the same EnumValue value`)
    }
    catch (e) {
        t.is(e.message, `The value "16:FF0000" is already used for "Colors.R"`)
    }
})

test("JSON.parse EnumValue with Wrong Enum", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    const Orientations = Enum.Orientations("NORTH", "WEST", "SOUTH", "EAST")
    t.is(Orientations.parse('Colors.RED'), null)
})

test("JSON.parse EnumValue wrong data", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.parse("Random string"), null)
    t.is(Colors.parse('{"Random":"string"}'), null)
})

// test("JSON.parse Enum wrong data", t => {
//     t.plan(60)
//     const tests = {
//         Colors: {
//             enumParsed: Enum.parse('{"Colors":{}}'),
//             testValues: {"RED":[0, "0"], "GREEN": [1, "1"], "BLUE": [2, "2"]}
//         },
//         DecColors: {
//             enumParsed: Enum.parse('{"DecColors":{"base":10,"values":{"RED":"16711680","GREEN":"65280","BLUE":"255"}}}'),
//             testValues: {"RED":[0xFF0000, "16711680"], "GREEN": [0x00FF00, "65280"], "BLUE": [0x0000FF, "255"]}
//         },
//         HexaColors: {
//             enumParsed: Enum.parse('{"HexaColors":{"base":16,"values":{"RED":"FF0000","GREEN":"00FF00","BLUE":"0000FF"}}}'),
//             testValues: {"RED":[0xFF0000, "FF0000"], "GREEN": [0x00FF00, "00FF00"], "BLUE": [0x0000FF, "0000FF"]}
//         },
//         BinColors: {
//             enumParsed: Enum.parse('{"BinColors":{"base":2,"values":{"RED":"100","GREEN":"010","BLUE":"001"}}}'),
//             testValues: {"RED":[4, "100"], "GREEN": [2, "010"], "BLUE": [1, "001"]}
//         }
//     }
//     for (const name of Object.keys(tests))
//     {
//         const { enumParsed, testValues } = tests[name]
//         const keys = Object.keys(testValues)
//         for (let i = 0; i < keys.length; ++i)
//         {
//             const key = keys[i]
//             t.is(enumParsed[key].name, key, `${name}.name`)
//             t.is(enumParsed[key].longName, name + "." + key, `${name}.longName`)
//             t.is(enumParsed[key].index, i, `${name}.index`)
//             t.is(enumParsed[key].value, testValues[key][0], `${name}.value`)
//             t.is(enumParsed[key].stringValue, testValues[key][1], `${name}.stringValue`)
//         }
//     }
// })