export async function onRequestPost(context) {
  try {
    const email = await context.request.json().email;
    const emailoctopusReturn = requestEmailOctopus(email);
    return new Response(JSON.stringify({ message: `[NEWSLETTER] Subscribe with email: ${email}`, content: emailoctopusReturn, return: 0 }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

function requestEmailOctopus(email) {
  if (email === null) {
    return {message: "email is null"};
  }
  const token = context.env.NL_KEY;
  const listId = context.env.NL_ID;
  const header = `Authorization: Bearer ${token}`;
  const url = `https://api.emailoctopus.com/lists/${listId}/contacts`;
  const data = JSON.stringify({
    "email_address": email,
    "fields": {
    },
    "tags": {
      "newsletter": true
    },
    "status": "subscribed"
  });

  const ret = await fetch(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  )

  return ret;
}