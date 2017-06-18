**another-enum** 0.0.2
=================
###_Another enum module, nothing more_

##**Install**
```
npm install another-enum
```

##**How does it work ?**
###**Import**
```
import { Enum } from 'another-enum'
const Enum = require('another-enum').Enum
```

###**Instantiate your Enum**
```
const Colors = Enum.Colors('RED', 'GREEN', 'BLUE')

const SimpleHexaColors = Enum.SimpleHexaColors({
    RED: 0xFF0000,
    GREEN: 0x00FF00,
    BLUE: 0x0000FF
})

// Should be avoided
// Because it will fail when trying to convert it in a number value
const CssColors = Enum.CssColors({
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF'
})
```

###Instantiate your Enum **with the base number**
```
const HexaColors = Enum.HexaColors(16, {
    RED: 0xFF0000,
    GREEN: 0x00FF00,
    BLUE: 0x0000FF
})

// Allow you to write your numbers in string, they will be converted after
// Binary
const BinColors = Enum.BinColors(2, {
    RED: '100',
    GREEN: '010',
    BLUE: '001'
})
// Hexa
const HexaColors2 = Enum.HexaColors2(16, {
    RED: 'FF0000',
    GREEN: '00FF00',
    BLUE: '0000FF'
})
// The nice thing by doing that is:
BinColors.RED.toString() // => 'BinColors.RED(2:100)'
HexaColors.GREEN.toString() // => 'HexaColors.GREEN(16:00FF00)'
HexaColors2.BLUE.toString() // => 'HexaColors2.BLUE(16:0000FF)'
// Hexa numbers will always be displayed in uppercase

// if you do not specify the base, it will be displayed as base 10
SimpleHexaColors.GREEN.toString() // => 'SimpleHexaColors.GREEN(65280)'
// A bit less readable, right ?
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

###**Switch case**
```
switch (color)
{
    case Colors.RED:
        console.log("The color is red.")
        break
    case Colors.GREEN:
        console.log("The color is green.")
        break
    case Colors.BLUE:
        console.log("The color is blue.")
        break
    default:
        console.log("The color is weird.")
}
```

###**Bitmask**
####**Checking a component is in the mask**
```
const yellowMask = Colors.RED | Colors.GREEN

if ((yellowMask & Colors.RED) === + Colors.RED)
	console.log('There is RED in yellow')
// Or
if (Colors.RED.isIn(yellowMask))
	console.log('there is RED in yellow')
```

####**Checking several components are in the mask**
```
const whiteMask = Colors.RED | Colors.GREEN | Colors.BLUE

const cyanMask = Colors.GREEN | Colors.BLUE
if ((whiteMask & cyanMask ) === cyanMask)
	console.log('There is GREEN and BLUE in white')
//Or
if (Colors.hasIn(whiteMask, Colors.GREEN, Colors.BLUE))
	console.log('There is GREEN and BLUE in white')
```

####**Extracting the components from a mask**
```
const magentaMask = Colors.RED | Colors.BLUE

// You can do whatever loop to extract the components
// Or
Colors.in(magentaMask)
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

####**hasIn**
```
const value = 0xFFFF00
HexaColors.hasIn(value, Colors.RED, Colors.GREEN) // true
HexaColors.hasIn(value, Colors.RED, Colors.BLUE) // false
```

####**in**
```
const value = 0xFFFF00
HexaColors.in(value) // [HexaColors.RED, HexaColors.GREEN]
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
    // color : string
    // | "RED"
    // | "GREEN"
    // | "BLUE"
    ;
```

###**EnumValue**
####**index**
```
Colors.RED.index // 0
HexaColors.RED.index // 0
CssColors.RED.index // 0
```

####**isIn**
```
const value = 0xFFFF00
HexaColors.RED.isIn(value) // true
HexaColors.GREEN.isIn(value) // true
HexaColors.BLUE.isIn(value) // false
```

####**longName**
```
Colors.RED.longName // "Colors.RED"
HexaColors.RED.longName // "HexaColors.RED"
CssColors.RED.longName // "CssColors.RED"
```

####**name**
```
Colors.RED.name // "RED"
HexaColors.RED.name // "RED"
CssColors.RED.name // "RED"
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
    . hasIn
    . in
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