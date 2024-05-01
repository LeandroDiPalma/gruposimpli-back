export default {
    coveragePathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    testEnvironment: 'node'
};