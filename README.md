![CS1 Logo](https://cdn.glitch.com/ea426344-f1a7-4a2b-8557-b641408c03a1%2FCS1_logo_64.png?v=1589664754866)
# CS1 Engine
___

## About
___

The <a href="https://cs1.netlify.app/cs1-game-engine/" rel="noopener noreferrer">CS1 Game Engine</a> is undergoing a complete rewrite.  Please take part in our community!  Your ideas and feedback are important! If you wish, you can remix this project to develop and build your own versions of the CS1 Game Engine, CS1 Game Server, CS1 Game Socket, and Custom CS1 Game Example.

## Examples
___

<a href="https://cs1-engine.glitch.me" rel="noopener noreferrer">Production Example with Minified Game Build</a>

<a href="https://cs1-engine.glitch.me/no-build.html" rel="noopener noreferrer">Production No-Build Example</a>

<a href="https://cs1-engine.glitch.me/staging" rel="noopener noreferrer">Staging/Development Example with Minified Game Build</a>

<a href="https://cs1-engine.glitch.me/staging/no-build.html" rel="noopener noreferrer">Staging/Development No-Build Example</a>


<a href="https://cs1-engine.glitch.me/staging/min.html" rel="noopener noreferrer">Staging/Development Minimal HTML Example</a>

___

## Publishing to NPM

#### Use the following pattern to publish any npm package from Glitch


If you wish to create your own modified version of the CS1 Game Server:
- Create an <a href="https://www.npmjs.com/" rel="noopener noreferrer ">**npm account**</a>
- Create an <a href="https://docs.npmjs.com/creating-and-viewing-authentication-tokens" rel="noopener noreferrer ">**npm token**</a>
- Record your **npm token** in **.env**.
- Create a **.npmrc** file in the **src/server** directory with the following line:
```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```
- Configure the **package.json** in the **src/server** directory according to your details
- Make sure to set a unique version before publishing package to npm.
- Open a **Terminal** and run ```cd src/server```
- In the **Terminal** run ```npm publish```








