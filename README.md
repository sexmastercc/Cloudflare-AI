
# Cloudflare LLaMa Worker AI Chatbot

This project is a POC and a pretty basic (but will be updated!) way of creating your own chatbot using cloudflares new and 100% free (No KYC or credit card!) way to create an AI chatbot with a simple UI.
Due to this feature being in beta it may be hard to keep up with the newest updates so make sure your API is up to date with the newest code.
This is NOT for production use.


## Steps

First create a cloudflare account.
https://cloudflare.com/ this is 100% free and does not require any KYC. Max 100k requests per day. (on free plan)

```
  1) Create cloudflare account
  2) Go to https://dash.cloudflare.com/
  3) Click workers & pages
  4) Click AI then "Worker AI Worker Templates"
  5) Select LLM App
  6) Name it whatever you want
  7) Click deploy
  8) Click edit code
  9) In this repo there is the CF folder and HTML folder, in the CF folder copy all the code inside the worker.js file.
  10) paste the code in & click save and deploy
  11) Copy the URL and save it since it will be needed.
  12) Next eather use cloudflare pages (recommened) or any other hosting site of your choice for static hosting such as netlify or github pages
  13) Upload ALL the files from the html folder and edit the script.js
  14) modify the API Url to the URL you got from your worker
  15) Profit!!
```
    
## Basic API Explenation

The API is pretty simple, there are 3 main parts:

1) Root path redirects to randomly generated ID ==> "/" --> [redirect] --> "/ID"
2) View ID & messages ==> "/ID"
3) Submit a query ==> "/ID?q=%query"

####Extra:
API details page ==> "/api"

Every ID by default has a max of 100 requests to the AI before being to be re-generated, this can be configured in the worker js file.

### Future updates:

```
1) Rate limiting your API [PARTIALLY DONE ☄️]
2) Password locking your API [NO SUPPORT YET🌑]
3) Much better Frontend UI [WIP]
4) Ability to keep UUID/apikey and go back to previous conversations (frontend) [NO SUPPORT YET🌑]
5) Add markdown support on frontend [DONE! ⭐]
6) Ability to change models quickly and easily [PARTIALLY DONE ☄️]
7) Voice & audio to text via wisper (not any time soon) [NO SUPPORT YET🌑]
```

### Why this over the offical cloudflare API?

1) custom domain.
2) much more customization.
3) ability to easily share your api without giving out any api keys.
4) chat history (limited but better than none) and ID system.
5) pre-made frontend

#### known issues:
--> Sometimes the bot will respond with nothing, this is becasue the amount of text in history execed cloudflares max which is pretty low, solution is to lower max history or set it to none if needed.

#### Wanna host *without* cloudflare workers?
Use miniflare! allows you to host cloudflare workers off your local machine and if you wanna go all out use cloudflared tunnel to create a tunnel to the public with your custom domain!
https://github.com/cloudflare/miniflare

### If you are using this project PLEASE provide credit it is greatly appricated :)
![Logo](https://github.com/localuser-isback/Cloudflare-AI/blob/main/logo.png?raw=true)
