# Standalone Offline Darkorbit Client

I got a bit nostalgic and started to mess around with the old client. Goal was to package the flash client, CMS and emulator into one executable in order to create an "Dark Orbit Remix" type of game based on the real client. This is an working prototype, but when packaged as an executable it's not working (yet). 

To make the client work when packaged, the electron application needs to launch the web-server, policy-server and the game-server (emulator) as a child process (or run them somehow else alongside the main electron app). I don't have the time to wrap my head around the packaging, so that's why I stopped it and made it opensource.

Feel free to do whatever you want with it :)

# Setup

1. `npm i -D` (or for M1 users `npm i -D --arch=x64`)
2. `npm run start`

# Credits
- https://github.com/MuffinMario/Old-Darkorbit-Project-2009-Cpp
- https://github.com/IhanSadiq/dops_client