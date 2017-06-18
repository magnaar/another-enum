'use strict'

import test from "ava"
import { Enum } from "../another-enum"

test.failing("Error message for twice the same EnumValue value with base", t => {
    try {
        Enum.Colors(16, { R: 0xFF0000, G: 0xFF0000, B: 0x0000FF })
        t.fail(`Can't have twice the same EnumValue value`)
    }
    catch (e) {
        t.is(e.message, `The value "16:FF0000" is already used for "Colors.R"`)
    }
})