module.exports = {
    'parserOptions': {
        'sourceType': 'module'
    },
    'globals': {
        'fixture': true,
        'test': true
    },
    'rules': {
        'new-cap': ['error', { 'capIsNewExceptions': ['Selector'] }]
    }
};
