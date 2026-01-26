const {defineCliConfig} = require('sanity/cli')

module.exports = defineCliConfig({
  api: {
    projectId: 's8dt44uu', // Updated project ID
    dataset: 'production'
  },
  studioHost: 'get-the-gadgets'
})