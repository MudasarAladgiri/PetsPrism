import bcrypt from "bcryptjs";

const users = [
  {
    Name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    Name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    Name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
