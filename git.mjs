var name='tool'
var url='https://github.com/droog126/react-component.git'
await $`git init`
await $`git add *`
await $`git commit -m "testgi"`
// await $`git remote add ${name} ${url}`
await $`git push ${name} master`