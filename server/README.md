# cs1-game-server 
___

## Publishing a Custom Version of the CS1 Game Server

If you wish to create your own modified version of the CS1 Game Server:
- Create an <a href="https://www.npmjs.com/" rel="noopener noreferrer ">**npm account**</a>
- Create an <a href="https://docs.npmjs.com/creating-and-viewing-authentication-tokens" rel="noopener noreferrer ">**npm token**</a>
- Record your **npm token** in **.env**.
- Create a **.npmrc** file in this directory with the following line:
```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```
- Configure the **package.json** in this directory according to your details
- Make sure to set a unique version before publishing package to npm.
- In the Terminal run ```npm publish```




*IoT API appears in server.js currently because it requires express to conduct IoT device http polling.*







