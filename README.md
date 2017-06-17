**simple-enum** 0.0.1
=================
###_A simple enum module, nothing more_

##**Install**
```
npm install simple-enum
```

##**How does it work ?**
###**Import**
```
import { Enum } from "simple-enum"
const Enum = require("simple-enum").Enum
```

###**Instantiate your Enum**
```
const Colors = Enum.Colors("RED", "GREEN", "BLUE")

const HexaColors = Enum.Colors({
    RED: 0xFF0000,
    GREEN: 0x00FF00,
    BLUE: 0x0000FF
})

// Should be avoided
// Because it will fail when trying to convert it in a number value
const CssColors = Enum.Colors({
    RED: "#FF0000",
    GREEN: "#00FF00",
    BLUE: "#0000FF"
})
```

###**And simply use it**
```
const OtherColors = Enum.OtherColors("RED", "GREEN", "BLUE")

// true
Colors.RED == "RED"
Colors.RED.name ==/= "RED"
 + Colors.RED ==/= 0
Colors.RED.value ==/= 0
Colors.BLUE.name ==/= OtherColors.BLUE.name

// false
Colors.RED === "RED"
Colors.RED ==/= 0
Colors.BLUE ==/= OtherColors.BLUE
```

###**Enum**
####**get**(_value_)
```
Colors.get(1) // EnumValue GREEN
HexaColors.get(0x00FF00) // EnumValue GREEN
CssColors.get("#00FF00") // EnumValue GREEN
```

####**getAt**(_index_)
```
Colors.getAt(2) // EnumValue BLUE
HexaColors.getAt(2) // EnumValue BLUE
CssColors.getAt(2) // EnumValue BLUE
```

####**name**
```
Colors.name // "Colors"
HexaColors.name // "HexaColors"
CssColors.name // "CssColors"
```

####**iterate**
```
for (const color of Colors)
    // color : EnumValue
    // | RED
    // | GREEN
    // | BLUE
    ;
for (const color in Colors)
    // color : EnumValue
    // | RED
    // | GREEN
    // | BLUE
    ;
```

###**EnumValue**
####**name**
```
Colors.RED.name // "RED"
HexaColors.RED.name // "RED"
CssColors.RED.name // "RED"
```

####**longName**
```
Colors.RED.longName // "Colors.RED"
HexaColors.RED.longName // "HexaColors.RED"
CssColors.RED.longName // "CssColors.RED"
```

####**index**
```
Colors.RED.index // 0
HexaColors.RED.index // 0
CssColors.RED.index // 0
```

####**value**
```
Colors.RED.value // 0
HexaColors.RED.value // 0xFF0000
CssColors.RED.value // "#FF0000"
```

###**/!\\** You should always either capitalize or uppercase all your enum values. This allow to avoid shadowing methods on them or get an error at your face. 

####For safety sake, these names are forbidden for enum values:
    . get
    . getAt
    . index
    . name
    . toString
_They will throw an error if you use them_

You can't add twice the same name/value in an Enum.
It will throw an error
```
// "RED" is already defined in "Colors"
Enum.Colors("RED", "RED", "BLUE")

// The value "16711680" is already used for "Colors.RED"
Enum.Colors({RED: 0xFF0000, GREEN: 0xFF0000, BLUE: 0x0000FF })
```