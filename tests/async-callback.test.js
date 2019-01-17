import {Selector} from 'testcafe';

fixture('Async callback').page('../examples/async-callback.html');

test('Click increment multiple times', async tc => {
    await tc
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('1')
        .click('#increment')
        .expect(Selector('#incrementResult').textContent).eql('2');
});
