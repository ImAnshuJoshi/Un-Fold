let user = { name: "AYO", id: "i" };
export function set(n, i) {
  user.name = n;
  user.id = i;
}
export default function get() {
  return user;
}
