[Utopian.io](https://utopian.io) wants to reward Open Source contributors for their hard work. 
Forked from https://github.com/busyorg/busy, Utopian uses the [STEEM Blockchain](https://steem.io) to reward contributors in cryptocurrency.

See the website in action [here:](https://utopian.io)

<center><img src="https://steemitimages.com/DQmYgMbYHNtiNmA6TbSL34tNwaMvxsQu2o5zrDvnbDks8bY/image.png"/></center>
  
## Contributing to this Project
Get in touch on Discord: https://discord.gg/Pc8HG9x

### Clone and Install
git clone https://github.com/utopian-io/utopian.io utopian.io

cd utopian.io

npm install

### Generate and Export SSL Certificates
openssl req -x509 -sha512 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

export SERVER_SSL_CERT="/path/cert.pem"

export SERVER_SSL_KEY="/path/key.pem"

export NODE_TLS_REJECT_UNAUTHORIZED=0

Replace path with the path to the generated .pem files.
You may need to authorise your browser in using a self-signed SSL certificate


### Set SC Utopian App
Add the enviroment variable UTOPIAN_APP using the app name of your Steem Connect oauth application. You can create a SC app here https://v2.steemconnect.com/apps/create. The same app will have to be used and setup in the backend https://github.com/utopian-io/api.utopian.io.

### Run The Frontend
npm run dev-server


#### API Server
Our sister project [utopian-io/api.utopian.io](https://github.com/utopian-io/api.utopian.io) provides the back-end APIs for Utopian. If you want to run Utopian locally, you **do need**  to run that project, though you may want to check it out!

### Supported by BrowserStack

We use BrowserStack for testing our frontend and our bug contributions! We are verry thankful that browserstack.com supports utopian.io

[![BrowserStack.com](https://d.pics/i/QmXLQMnAreyJ3WkXzAuK33ibbKejFxy4YASgq6diaYHsX5)](https://browserstack.com)

## License
GNU Public License v3.0. Copyright Utopian.io

Original source code licensed under MIT License. Copyright Busy 
