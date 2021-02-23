test("create a user", () => {
  const user = createNewUser({
    name: "Dave",
    id: "1",
    email: "dave@gmail.com",
  });
  expect(user.name).toBe("Dave");
  expect(user.id).toBe("1");
  expect(user.email).toBe("dave@gmail.com");
});
