let user = { name: "sohan", id: "45ea82fe-5a2d-402b-a19c-fccafa383b85" };
export function set(n, i) {
  user.name = n;
  user.id = i;
}
export default function get() {
  return user;
}
