async function test() {
  const res = await fetch("http://localhost:3000/api/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
  });
  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Data:", JSON.stringify(data, null, 2).substring(0, 500) + "...");
}
test().catch(console.error);
