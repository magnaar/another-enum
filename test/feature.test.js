'use strict'

import test from "ava"
import { Enum } from "../another-enum"

test("Create a new Enum", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Object.keys(Colors).length, 3)
})

test("Check Enum string values", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.RED == "RED", true)
    t.is(Colors.GREEN == "GREEN", true)
    t.is(Colors.BLUE == "BLUE", true)
})

test("Check Enum number values", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(+Colors.RED == 0, true)
    t.is(+Colors.GREEN == 1, true)
    t.is(+Colors.BLUE == 2, true)
})

test("List all Enum values (of)", t => {
    t.plan(3)
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    const colors = { "RED": 0, "GREEN": 1, "BLUE": 3 }
    for (const color of Colors)
    {
        t.is(colors[color] !== undefined, true)
        delete colors[color]
    }
})

test("List all Enum values (in)", t => {
    t.plan(3)
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    const colors = { "RED": 0, "GREEN": 1, "BLUE": 3 }
    for (const color in Colors)
    {
        t.is(colors[color] !== undefined, true)
        delete colors[color]
    }
})

test("Get Enum length", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.length, 3)
})

test("Get an Enum value", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(!!Colors.BLUE, true)
})

test("Get an Enum value long name", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.GREEN.longName, "Colors.GREEN")
})

test("Get an Enum value with its value", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.get(1).name, "GREEN")
})

test("Get an Enum value with its index", t => {
    const Time = Enum.Time({
        SECOND: 1,
        MINUTE: 60,
        HOUR: 3600
    })
    t.is(Time.getAt(2).name, "HOUR")
})

test("Get an Enum index", t => {
    const Time = Enum.Time({
        SECOND: 1,
        MINUTE: 60,
        HOUR: 3600
    })
    t.is(Time.HOUR.index, 2)
})

test("Enum value to int", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(+Colors.BLUE, 2)
    t.is(Colors.BLUE.value, 2)
})

test("Two Enum values from different Enums are differents", t => {
    const Colors1 = Enum.Colors("RED", "GREEN", "BLUE")
    const Colors2 = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors1.RED == Colors2.RED, false)
})

test("Two Enum values from the same Enum are equals", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.GREEN === Colors.GREEN, true)
})

test("Stringify Enum value", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.RED.toString(), "Colors.RED(0)")
    t.is(Colors.GREEN.toString(), "Colors.GREEN(1)")
    t.is(Colors.BLUE.toString(), "Colors.BLUE(2)")
})

test("Enum values with special values", t => {
    const Time = Enum.Time({
        SECOND: 1,
        MINUTE: 60,
        HOUR: 3600
    })
    t.is(Time.SECOND == "SECOND", true)
    t.is(+Time.SECOND == 1, true)
    t.is(Time.MINUTE == "MINUTE", true)
    t.is(+Time.MINUTE == 60, true)
    t.is(Time.HOUR == "HOUR", true)
    t.is(+Time.HOUR == 3600, true)
})

test("Weird test", t => {
    const Colors = Enum.Colors({
        RED: "#FF0000",
        GREEN: "#00FF00",
        BLUE: "#0000FF"
    })
    t.is(Colors.RED == "RED", true)
    t.is(Colors.RED.value == "#FF0000", true)
    t.is(Colors.GREEN == "GREEN", true)
    t.is(Colors.GREEN.value == "#00FF00", true)
    t.is(Colors.BLUE == "BLUE", true)
    t.is(Colors.BLUE.value == "#0000FF", true)
    t.is(Colors.BLUE.toString(), "Colors.BLUE(#0000FF)")
    t.is(Colors.get("#00FF00").longName, "Colors.GREEN")
})

test("Switch case", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.plan(3)
    let i = 0
    for (const color of Colors)
        switch (color)
        {
            case Colors.RED:
                t.is(i++, 0)
                break
            case Colors.GREEN:
                t.is(i++, 1)
                break
            case Colors.BLUE:
                t.is(i++, 2)
                break
            default:
                t.fail()
        }
})

test("Base 16 Enum values toString", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    t.is(Colors.RED.toString(), "Colors.RED(16:FF0000)")
    t.is(Colors.GREEN.toString(), "Colors.GREEN(16:00FF00)")
    t.is(Colors.BLUE.toString(), "Colors.BLUE(16:0000FF)")
})

test("Base 16 string Enum values toString", t => {
    const Colors = Enum.Colors(16, {
        RED: 'FF0000',
        GREEN: '0x00FF00',
        BLUE: '0000FF'
    })
    t.is(Colors.RED.toString(), "Colors.RED(16:FF0000)")
    t.is(Colors.GREEN.toString(), "Colors.GREEN(16:00FF00)")
    t.is(Colors.BLUE.toString(), "Colors.BLUE(16:0000FF)")
})

test("Base 2 Enum values toString", t => {
    const Colors = Enum.Colors(2, {
        RED: '100',
        GREEN: '010',
        BLUE: '001'
    })
    t.is(Colors.RED.toString(), "Colors.RED(2:100)")
    t.is(Colors.GREEN.toString(), "Colors.GREEN(2:010)")
    t.is(Colors.BLUE.toString(), "Colors.BLUE(2:001)")
})

test("Base 16 Enum values toString full int", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000FF,
        GREEN: 0x00FF00FF,
        BLUE: 0x0000FFFF
    })
    t.is(Colors.RED.toString(), "Colors.RED(16:FF0000FF)")
    t.is(Colors.GREEN.toString(), "Colors.GREEN(16:00FF00FF)")
    t.is(Colors.BLUE.toString(), "Colors.BLUE(16:0000FFFF)")
})

test("Base 16 Enum values toString full int", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000FF,
        GREEN: 0x00FF00FF,
        BLUE: 0x0000FFFF
    })
    t.is(Colors.RED.toString(), "Colors.RED(16:FF0000FF)")
    t.is(Colors.GREEN.toString(), "Colors.GREEN(16:00FF00FF)")
    t.is(Colors.BLUE.toString(), "Colors.BLUE(16:0000FFFF)")
})

test("Bitmask composing", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    t.is(Colors.RED | Colors.GREEN, 0xFFFF00)
})

test("Bitmask decomposing", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    t.is((0xFFFF00 & Colors.RED) === +Colors.RED, true)
})

test("Bitmask checking one component", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    const value = 0xFFFF00
    t.is(Colors.RED.isIn(value), true)
    t.is(Colors.BLUE.isIn(value), false)
})

test("Bitmask checking multiple components (EnumValue)", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    const value = 0xFFFF00
    t.is(Colors.hasIn(value, Colors.RED, Colors.GREEN), true)
    t.is(Colors.hasIn(value, Colors.RED, Colors.BLUE), false)
})

test("Bitmask checking multiple components (number)", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    const value = 0xFFFF00
    t.is(Colors.hasIn(value, 0xFF0000, 0x00FF00), true)
})

test("Bitmask checking multiple components (string)", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    const value = 0xFFFF00
    t.is(Colors.hasIn(value, "RED", "GREEN"), true)
})

test("Bitmask checking multiple components (mixed)", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    const value = 0xFFFF00
    t.is(Colors.hasIn(value, Colors.RED, "GREEN"), true)
    t.is(Colors.hasIn(value, "RED", 0x0000FF), false)
    t.is(Colors.hasIn(value, Colors.RED, 0x0000FF), false)
})

test("Bitmask getting components", t => {
    const Colors = Enum.Colors(16, {
        RED: 0xFF0000,
        GREEN: 0x00FF00,
        BLUE: 0x0000FF
    })
    const value = 0xFFFF00
    const expected = [Colors.RED, Colors.GREEN]
    t.plan(2)
    for (const color of Colors.in(value))
    {
        t.is(expected.includes(color), true)
        delete expected[color]
    }
})

test("JSON.stringify EnumValue", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(JSON.stringify(Colors.RED), '"Colors.RED"')
    t.is(JSON.stringify({ color: Colors.RED }), '{"color":"Colors.RED"}')
})

test("JSON.parse EnumValue", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.parse('Colors.RED'), Colors.RED)
    t.is(Colors.parse('"Colors.RED"'), Colors.RED)
})

test("JSON.stringify/parse EnumValue", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    t.is(Colors.parse(JSON.stringify(Colors.RED)), Colors.RED)
    t.is(Colors.parse(JSON.stringify(Colors.GREEN)), Colors.GREEN)
    t.is(Colors.parse(JSON.stringify(Colors.BLUE)), Colors.BLUE)
})

test("JSON.stringify Enum", t => {
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    const DecColors = Enum.DecColors(10, {"RED":0xFF0000, "GREEN":0x00FF00, "BLUE":0x0000FF})
    const HexaColors = Enum.HexaColors(16, {"RED":0xFF0000, "GREEN":0x00FF00, "BLUE":0x0000FF})
    const BinColors = Enum.BinColors(2, {"RED":"100", "GREEN":"010", "BLUE":"001"})
    const CssColors = Enum.CssColors({RED: '#FF0000', GREEN: '#00FF00', BLUE: '#0000FF'})
    t.is(JSON.stringify(Colors), '{"Colors":{"values":["RED","GREEN","BLUE"]}}')
    t.is(JSON.stringify(DecColors), '{"DecColors":{"base":10,"values":{"RED":"16711680","GREEN":"65280","BLUE":"255"}}}')
    t.is(JSON.stringify(HexaColors), '{"HexaColors":{"base":16,"values":{"RED":"FF0000","GREEN":"00FF00","BLUE":"0000FF"}}}')
    t.is(JSON.stringify(BinColors), '{"BinColors":{"base":2,"values":{"RED":"100","GREEN":"010","BLUE":"001"}}}')
    t.is(JSON.stringify(CssColors), '{"CssColors":{"values":{"RED":"#FF0000","GREEN":"#00FF00","BLUE":"#0000FF"}}}')

    t.is(JSON.stringify({colors: Colors}), '{"colors":{"Colors":{"values":["RED","GREEN","BLUE"]}}}')
})

test("JSON.parse Enum", t => {
    t.plan(75)
    const tests = {
        Colors: {
            enumParsed: Enum.parse('{"Colors":{"values":["RED","GREEN","BLUE"]}}'),
            testValues: {"RED":[0, "0"], "GREEN": [1, "1"], "BLUE": [2, "2"]}
        },
        DecColors: {
            enumParsed: Enum.parse('{"DecColors":{"base":10,"values":{"RED":"16711680","GREEN":"65280","BLUE":"255"}}}'),
            testValues: {"RED":[0xFF0000, "16711680"], "GREEN": [0x00FF00, "65280"], "BLUE": [0x0000FF, "255"]}
        },
        HexaColors: {
            enumParsed: Enum.parse('{"HexaColors":{"base":16,"values":{"RED":"FF0000","GREEN":"00FF00","BLUE":"0000FF"}}}'),
            testValues: {"RED":[0xFF0000, "FF0000"], "GREEN": [0x00FF00, "00FF00"], "BLUE": [0x0000FF, "0000FF"]}
        },
        BinColors: {
            enumParsed: Enum.parse('{"BinColors":{"base":2,"values":{"RED":"100","GREEN":"010","BLUE":"001"}}}'),
            testValues: {"RED":[4, "100"], "GREEN": [2, "010"], "BLUE": [1, "001"]}
        },
        CssColors: {
            enumParsed: Enum.parse('{"CssColors":{"values":{"RED":"#FF0000","GREEN":"#00FF00","BLUE":"#0000FF"}}}'),
            testValues: {"RED":["#FF0000", "#FF0000"], "GREEN": ["#00FF00", "#00FF00"], "BLUE": ["#0000FF", "#0000FF"]}
        }
    }
    for (const name of Object.keys(tests))
    {
        const { enumParsed, testValues } = tests[name]
        const keys = Object.keys(testValues)
        for (let i = 0; i < keys.length; ++i)
        {
            const key = keys[i]
            t.is(enumParsed[key].name, key, `${name}.name`)
            t.is(enumParsed[key].longName, name + "." + key, `${name}.longName`)
            t.is(enumParsed[key].index, i, `${name}.index`)
            t.is(enumParsed[key].value, testValues[key][0], `${name}.value`)
            t.is(enumParsed[key].stringValue, testValues[key][1], `${name}.stringValue`)
        }
    }
})

test("JSON stringify/parse Enum", t => {
    t.plan(75)
    const Colors = Enum.Colors("RED", "GREEN", "BLUE")
    const DecColors = Enum.DecColors(10, {"RED":0xFF0000, "GREEN":0x00FF00, "BLUE":0x0000FF})
    const HexaColors = Enum.HexaColors(16, {"RED":0xFF0000, "GREEN":0x00FF00, "BLUE":0x0000FF})
    const BinColors = Enum.BinColors(2, {"RED":"100", "GREEN":"010", "BLUE":"001"})
    const CssColors = Enum.CssColors({RED: '#FF0000', GREEN: '#00FF00', BLUE: '#0000FF'})
    const tests = {
        Colors: {
            enumParsed: Enum.parse(JSON.stringify(Colors)),
            testValues: {"RED":[0, "0"], "GREEN": [1, "1"], "BLUE": [2, "2"]}
        },
        DecColors: {
            enumParsed: Enum.parse(JSON.stringify(DecColors)),
            testValues: {"RED":[0xFF0000, "16711680"], "GREEN": [0x00FF00, "65280"], "BLUE": [0x0000FF, "255"]}
        },
        HexaColors: {
            enumParsed: Enum.parse(JSON.stringify(HexaColors)),
            testValues: {"RED":[0xFF0000, "FF0000"], "GREEN": [0x00FF00, "00FF00"], "BLUE": [0x0000FF, "0000FF"]}
        },
        BinColors: {
            enumParsed: Enum.parse(JSON.stringify(BinColors)),
            testValues: {"RED":[4, "100"], "GREEN": [2, "010"], "BLUE": [1, "001"]}
        },
        CssColors: {
            enumParsed: Enum.parse(JSON.stringify(CssColors)),
            testValues: {"RED":["#FF0000", "#FF0000"], "GREEN": ["#00FF00", "#00FF00"], "BLUE": ["#0000FF", "#0000FF"]}
        }
    }
    for (const name of Object.keys(tests))
    {
        const { enumParsed, testValues } = tests[name]
        const keys = Object.keys(testValues)
        for (let i = 0; i < keys.length; ++i)
        {
            const key = keys[i]
            t.is(enumParsed[key].name, key, `${name}.name`)
            t.is(enumParsed[key].longName, name + "." + key, `${name}.longName`)
            t.is(enumParsed[key].index, i, `${name}.index`)
            t.is(enumParsed[key].value, testValues[key][0], `${name}.value`)
            t.is(enumParsed[key].stringValue, testValues[key][1], `${name}.stringValue`)
        }
    }
})
