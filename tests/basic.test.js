import {Selector} from 'testcafe';

fixture('Getting Started').page('../examples/basic.html');

test('Clicks the basic test increment button', async tc => {
    await tc
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('1')
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('2');
});
