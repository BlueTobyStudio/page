export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const email = body.email;
    const emailoctopusReturn = await requestEmailOctopus(context, email);
    return new Response(JSON.stringify({ message: `Subscribe with email: ${email}`, content: emailoctopusReturn, return: (emailoctopusReturn.status === 200) }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

async function requestEmailOctopus(context, email) {
  if (email === undefined) {
    return {message: "email is null", return: 1};
  }
  const token = context.env.NL_KEY;
  const listId = context.env.NL_ID;
  const url = `https://api.emailoctopus.com/lists/${listId}/contacts`;
  const data = JSON.stringify({
    "email_address": email,
    "fields": {
    },
    "tags": [
      "newsletter"
    ],
    "status": "subscribed"
  });

  const ret = await fetch(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: data
    }
  );
  const json = await ret.json();
  return json;
}