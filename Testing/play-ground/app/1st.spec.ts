
describe('1st tests', () => {
    it('true is true', 
        () => expect(true).toEqual(true)
    )
    
    it('null is not the same thing as undefined',
        () => {
            expect(null).not.toEqual(undefined)
        } 
    )

    it('Jasmine Async',
        done => {
            setTimeout(
                ()=> {
                    expect(null).not.toEqual(undefined)
                    done()
                }
            , 1000)
        }
    )
})

// describe('Future test',  () => {
//     it('Will check the future')
// })