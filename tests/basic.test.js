import {Selector} from 'testcafe';

fixture('Basic synchronous').page('../examples/basic.html');

test('Click increment multiple times', async tc => {
    await tc
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('1')
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('2');
});
