const {publish} = require("./src")
const {login} = require("./src");

async function main(cmd) {
  switch (cmd) {
    case "publish":
      await publish()
      break
    case "login":
      await login()
      break
  }
}

main(process.argv[2])
