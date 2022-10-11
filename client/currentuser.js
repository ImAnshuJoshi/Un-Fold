let user = { name: "sohan", id: "48eb093b-813b-45fa-812e-5cfea19ba94e" };
export function set(n, i) {
  user.name = n;
  user.id = i;
}
export default function get() {
  return user;
}
