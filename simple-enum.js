'use strict'

const hidden = Symbol.for("hidden")
const forbiddenEnumValueNames = [ "get", "getAt", "index", "name", "toString" ]

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
            values: {}
        }
        const addEnumValue = (name, value) => {
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
        {
            Object.keys(values[0])
                .forEach(v => addEnumValue(v, values[0][v]))
        }
    }

    get(value)
    {
        return this[hidden].values[value]
    }

    getAt(index)
    {
        return this[hidden].enumValues[index]
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
        for (const prop of this[hidden].enumValues)
            yield prop
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
        return `${this[hidden].longName}(${this.value})`
    }
}

module.exports.Enum = new Proxy({}, new EnumCreator)
