[Utopian.io](https://utopian.io) wants to reward Open Source contributors for their hard work. 
Forked from https://github.com/busyorg/busy, Utopian uses the [STEEM Blockchain](https://steem.io) to reward contributors in cryptocurrency.

See the website in action [here:](https://utopian.io)

<center><img src="https://steemitimages.com/DQmYgMbYHNtiNmA6TbSL34tNwaMvxsQu2o5zrDvnbDks8bY/image.png"/></center>
  
## Contributing to this Project
1. Get in touch on Discord: https://discord.gg/5qMzAJ
2. Clone this repository locally on your computer. If you don't have `git` installed, simply pressing the "Download ZIP" button and unzipping the file should work.
3. **Locally**, go to the `webpack/webpack-dev-server.js` file. Change the line that begins with `UTOPIAN_API` to this:
```javascript
UTOPIAN_API: JSON.stringify(process.env.UTOPIAN_API || 'https://api.utopian.io/api/'),
```
Remember not to push this change to the repository in your commits/pull requests.

4. Use Terminal or your Command Prompt and change the directory to the `utopian.io` directory (`cd`). 
5. Once you're inside the `utopian.io` directory in Terminal, run these commands:
```bash
npm install
npm run dev-server
```
These commands may take a while to process, because it needs to download everything necessary to start Utopian. Once it's done, wait for text like this:

![](https://steemitimages.com/DQmaaMZtej1YsQYrFXZh3qTLKgCXNTiFYhUb6U2UT4yyb7c/image.png)

Utopian is now running on your machine! 
* To access the local website, use any browser and go to `localhost:3000/` (or whatever Terminal says next to "Project is running at".)
* To make a code change, use any editor to change any file in the code locally. If you change a `.js` file, the `webpack` will probably _automatically_ update itself and reload any browser pages that are viewing your local snapshot.
* When submitting a pull request, make sure to uncheck/delete the original `webpack-dev-server.js` code change, as that's only used for running the project locally.

#### API Server
Our sister project [utopian-io/api.utopian.io](https://github.com/utopian-io/api.utopian.io) provides the back-end APIs for Utopian. If you want to run Utopian locally, you **do not** need to run that project, though you may want to check it out anyways!
## License
GNU Public License v3.0
