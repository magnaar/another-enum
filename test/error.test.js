'use strict'

import test from "ava"
import { Enum } from "../another-enum"

test("Forbidden EnumValue names", t => {
    const forbiddenEnumValueNames = [ "get", "getAt", "name", "toString" ]
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