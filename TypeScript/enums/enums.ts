// -- Enum --

enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}

// -- Const Enum --

const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// compiles to: var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];