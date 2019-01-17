import {Selector} from 'testcafe';

fixture('Async promise').page('../examples/async-promise.html');

test('Click increment multiple times', async tc => {
    await tc
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('1')
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('2');
});
