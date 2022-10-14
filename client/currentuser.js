let user = { name: "Aaroh", id: "0ee3b0a7-5732-4fe9-8c8f-f4aa045bebbd" };
export function set(n, i) {
  user.name = n;
  user.id = i;
}
export default function get() {
  return user;
}
