# nucleus-github-auth-proxy
Proxy app used for github authentication

## Why?
Nucleus is meant to be worked with collaboratively, so users will want other users to log into nucleus with github. For this we can't have localhost based login when users share their local servers. In this case, users would otherwise be forced to host nucleus somewhere which is something I don't want. So this proxy app is used for assisting in login with github.

## Usage
This app is hosted on http://ultimate-ide-auth-proxy.meteor.com/ You'll need to create a github application to ask for permissions and stuff and put http://ultimate-ide-auth-proxy.meteor.com/ as the HomePage URL and http://ultimate-ide-auth-proxy.meteor.com/github-auth as Authorization callback URL. Rest all is handled by nucleus.

## How it works?
It is a simple proxy. You don't need to know how it works but just becasue you asked, it works like this:

1. Nucleus (localhost or hosted nucleus) tells this proxy that this is "my-url" and I want to login to github  
2. This proxy saves "my-url" (in a cookie) and sends user back to nucleus to login with github  
3. Nucleus ask github to let the user in  
4. Github ask user for permissions and redirect him to this proxy app with login tokens  
5. Proxy app checks the saved (in a cookie) "my-url" and redirect user to it with the tokens github provided  
6. Nucleus uses those tokens to generate an access_token and let the user in  
