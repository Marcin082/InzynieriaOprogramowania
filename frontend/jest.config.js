module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['/home/marcin/Desktop/InzynieriaOprogramowania/frontend/jest.setup.js'],
    transform: {
        '\\.[jt]sx?$': 'esbuild-jest',
    },
    moduleNameMapper: {
        "^.+\\.css$": "identity-obj-proxy",
    },
    // Add the following loader configuration
    loader: {
        '.js': 'jsx',
    },
};
