'use strict'

const hidden = Symbol.for("hidden")
const forbiddenEnumNames = [ "parse" ]
const forbiddenEnumValueNames = [ "get", "getAt", "hasIn", "in", "index", "name", "parse", "toJSON", "toString" ]

class EnumCreator
{
    get(target, name)
    {
        if (this[name])
            return this[name]
        return (...args) => new Enum(name, args)
    }

    parse(string)
    {
        let obj = JSON.parse(string)
        let params = []
        const name = Object.keys(obj)[0]
        obj = obj[name]
        if (obj.base)
            params.push(obj.base)
        if (obj.values instanceof Array)
            params = [...params, ...obj.values]
        else
            params = [...params, obj.values]
        return new Enum(name, params)
    }
}

function addEnumValue(thisEnum, enumName, name, value)
{
    let oldValue
    if (! isNaN(thisEnum[hidden].base) && typeof value == "string")
        value = parseInt(value, thisEnum[hidden].base)
    if (forbiddenEnumValueNames.includes(name))
        throw Error(`${enumName}."${name}" as EnumValue name is forbidden`)
    if (thisEnum[name])
        throw Error(`"${name}" is already defined in "${enumName}"`)
    if (thisEnum[hidden].values[value])
    {
        const enumValue = thisEnum[hidden].values[value]
        const base = isNaN(thisEnum[hidden].base) || thisEnum[hidden].base === 10
            ? ""
            : thisEnum[hidden].base + ":"
        throw Error(`The value "${base}${enumValue.stringValue}" is already used for "${enumName}.${enumValue}"`)
    }
    thisEnum[hidden].enumValues.push(thisEnum[name] = new EnumValue(thisEnum, name, value))
    thisEnum[hidden].values[value] = thisEnum[name]
}

class Enum
{
    constructor(enumName, values)
    {
        this[hidden] = {
            name: enumName,
            enumValues: [],
            values: {},
            base: (typeof values[0] !== "number" ? NaN : values.shift())
        }
        if (typeof values[0] == "string")
            values.forEach((v, i) => addEnumValue(this, enumName, v, i))
        else
            Object.keys(values[0])
                .forEach(v => addEnumValue(this, enumName, v, values[0][v]))
    }

    get name()
    {
        return this[hidden].name
    }

    get length()
    {
        return this[hidden].enumValues.length
    }

    get(value)
    {
        return this[hidden].values[value]
    }

    getAt(index)
    {
        return this[hidden].enumValues[index]
    }

    hasIn(value, ...maskComponents)
    {
        let mask = 0
        let maskComponent
        for (let i = 0; i < maskComponents.length; ++i)
        {
            maskComponent = maskComponents[i]
            if (typeof this[maskComponent] === "string")
                maskComponent = this[maskComponent]
            mask |= maskComponent
        }
        return (value & mask) === mask
    }

    in(value)
    {
        return this[hidden].enumValues
            .filter(ev => (ev & value) === +ev)
    }

    parse(string)
    {
        return this[hidden].enumValues
            .find(ev => ev.longName === string || JSON.stringify(ev) === string) || null
    }

    *[Symbol.iterator]()
    {
        let length = this[hidden].enumValues.length
        for (let i = 0; i < length; ++i)
            yield this[hidden].enumValues[i]
    }

    get [Symbol.toStringTag]()
    {
        return this.toString()
    }

    toString()
    {
        return `${this.name}(${Object.keys(this).join("|")})`
    }

    toJSON()
    {
        const isSimpleValues = this[hidden].enumValues.every(ev => ev.value === ev.index)
        let values = {}
        if (isSimpleValues)
            values = this[hidden].enumValues.map(ev => ev.name)
        else
            this[hidden].enumValues.forEach(ev => (values[ev.name] = ev.stringValue))
        return {
            [this.name]: {
                base: (isNaN(this[hidden].base) ? void 0 : this[hidden].base),
                values
            }
        }
    }
}

class EnumValue
{
    constructor(parent, name, value)
    {
        this[hidden] = {
            name,
            value,
            index: parent[hidden].enumValues.length,
            parent: parent,
            longName: `${parent.name}.${name}`
        }
    }

    get name()
    {
        return this[hidden].name
    }

    get longName()
    {
        return this[hidden].longName
    }

    get value()
    {
        return this[hidden].value
    }

    get stringValue()
    {
        if (! this[hidden].stringValue)
        {
            const base = this[hidden].parent[hidden].base
            if (base == 10 || isNaN(base))
                this[hidden].stringValue = this.value.toString()
            else
            {
                const length = Math.max(...Object.keys(this[hidden].parent[hidden].values)
                    .map(k => (+k).toString(base).length))
                let value = this.value.toString(base).toUpperCase()
                value = "0".repeat(length - value.length) + value
                this[hidden].stringValue = value
            }
        }
        return this[hidden].stringValue
    }

    get index()
    {
        return this[hidden].index
    }

    isIn(value)
    {
        return (this.value & value) === this.value
    }

    toJSON()
    {
        return this.longName
    }

    [Symbol.toPrimitive](hint)
    {
        if (hint == "number")
            return this.value
        return this.name
    }

    get [Symbol.toStringTag]()
    {
        return this.toString()
    }

    toString()
    {
        const base = this[hidden].parent[hidden].base
        let basePrefix = (base == 10 || isNaN(base) ? '' : base + ":")
        return `${this[hidden].longName}(${basePrefix}${this.stringValue})`
    }
}

module.exports.Enum = new Proxy({}, new EnumCreator)
