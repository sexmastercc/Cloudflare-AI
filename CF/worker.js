import { Ai } from './vendor/@cloudflare/ai';

function uuid() {
  let uuid = '';
  const chars = 'abcdef0123456789';
  for (let i = 0; i < 32; i++) {
    const charIndex = Math.floor(Math.random() * chars.length);
    uuid += chars[charIndex];
    if (i === 7 || i === 11 || i === 15 || i === 19) {
      uuid += '-';
    }
  }
  return uuid;
}

const chats = new Map();
const maxMemory = 5 //message history is required otherwise the AI just returns nothing.
const preprompt = "You are a helpful and responsive assistant, you answer questions directly and provide instruction unless told otherwise."; //allows for custom prompts on every message sent beforehand.

export default {
  async fetch(request, env) {
    const tasks = [];
    const url = new URL(request.url);
    const query = decodeURIComponent(url.searchParams.get('q'));
    const id = url.pathname.substring(1);
    const ai = new Ai(env.AI);

    if (!id) {
      const newId = uuid();
      const newUrl = `${url.origin}/${newId}`;
      return Response.redirect(newUrl, 301);
    }

    let chat = chats.get(id);

    if (!chat) {
      chat = {
        messages: [],
        userId: id,
        messageCount: 0,
      };
      chats.set(id, chat);
      chat.messages.push({ role: 'system', content: preprompt });
      tasks.push({ inputs: chat, response: chat.messages });
    }

    if (!query) {
      tasks.push({ inputs: chat, response: chat.messages });
      return new Response(JSON.stringify(tasks), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (query === "null") {
      tasks.push({ inputs: chat, response: chat.messages });
      return new Response(JSON.stringify(tasks), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    } else {
      chat.messages.push({ role: 'user', content: query });
      chat.messageCount += 1;

      if (chat.messageCount >= maxMemory + 1) {
        chat.messages = chat.messages.slice(-2);
        chat.messageCount = 0;
      }

      let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
      chat.messages.push({ role: 'system', content: response });
    }

    tasks.push({ inputs: chat, response: chat.messages });

    return new Response(JSON.stringify(tasks), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  },
};
