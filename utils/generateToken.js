module.exports = () => {
  const characters =
    "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
  let token = "";
  for (let i = 0; i < 20; i++) {
    token += characters[Math.floor(Math.random() * 100)];
  }
  return token;
};
