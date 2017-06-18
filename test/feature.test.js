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