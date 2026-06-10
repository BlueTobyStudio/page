export async function onRequestPost(context) {
  try {
    const email = await context.request.json().email;
    return new Response(JSON.stringify({ message: `Sub with email: ${email}` }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
