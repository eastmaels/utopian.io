Originally forked from https://github.com/busyorg/busy.git, Utopian wants to reward Open Source contributors for their hard work.

## Contributing
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

Utopian is now running on your machine! To access the local website, use any browser and go to `localhost:3000/` (or whatever Terminal says next to "Project is running at".)
## License
MIT
