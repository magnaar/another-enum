'use strict'

const hidden = Symbol.for("hidden")
const forbiddenEnumValueNames = [ "get", "getAt", "hasIn", "in", "index", "name", "toString" ]

class EnumCreator
{
    get(target, name)
    {
        return (...args) => new Enum(name, args)
    }
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
        const addEnumValue = (name, value) => {
            let oldValue
            if (! isNaN(this[hidden].base) && typeof value == "string")
                value = parseInt(value, this[hidden].base)
            if (forbiddenEnumValueNames.includes(name))
                throw Error(`${enumName}."${name}" as EnumValue name is forbidden`)
            if (this[name])
                throw Error(`"${name}" is already defined in "${enumName}"`)
            if (this[hidden].values[value])
                throw Error(`The value "${value}" is already used for "${enumName}.${this[hidden].values[value]}"`)
            this[hidden].enumValues.push(this[name] = new EnumValue(this, name, value))
            this[hidden].values[value] = this[name]
        }
        if (typeof values[0] == "string")
            values.forEach((v, i) => addEnumValue(v, i))
        else
            Object.keys(values[0])
                .forEach(v => addEnumValue(v, values[0][v]))
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

    get name()
    {
        return this[hidden].name
    }

    get length()
    {
        return this[hidden].enumValues.length
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

    get index()
    {
        return this[hidden].index
    }

    isIn(value)
    {
        return (this.value & value) === this.value
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
        let value = this.value
        let basePrefix = (base == 10 || isNaN(base) ? '' : base + ":")
        if (! this[hidden].valueString)
        {
            if (base == 10 || isNaN(base))
                this[hidden].valueString = this.value.toString()
            else
            {
                const length = Math.max(...Object.keys(this[hidden].parent[hidden].values)
                    .map(k => (+k).toString(base).length))
                value = this.value.toString(base).toUpperCase()
                value = "0".repeat(length - value.length) + value
                this[hidden].valueString = value
                basePrefix = base + ":"
            }
        }
        return `${this[hidden].longName}(${basePrefix}${this[hidden].valueString})`
    }
}

module.exports.Enum = new Proxy({}, new EnumCreator)
