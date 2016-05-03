declare namespace JSX {
    interface IntrinsicElements {
        my: {name?:boolean}
        div: any
    }
}

let names = ['Joe Dou', 'Dennis the Menace'];

<div>
    {names.map(function (i) { return <my>{name}</my>; })}
</div>