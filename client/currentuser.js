let user = { name: "AYO", id: "73ff605f-5c8a-4c11-ad32-93ffc002834d" };
export function set(n, i) {
  user.name = n;
  user.id = i;
}
export default function get() {
  return user;
}
