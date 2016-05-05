export class HomePageObject {    
    public copyright = element(by.css('.copyright'))
    public addButton = element(by.id('add'))
    public contactsList = element(by.tagName('contacts-list')).all(by.tagName('li'))

    selectContact(ind: number) {
        this.contactsList.get(ind).element(by.tagName('a')).click()
    }
    
    /////

    // typeInName(name: string) {
    //     this.name.clear();
    //     this.name.sendKeys(name);
    //     this.hiButton.click();
    // }
}
