const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bloggerz-c.vercel.app");
  res.header(
    "Access-Control-Allow-Methods",
    "GET",
    "PUT",
    "POST",
    "PATCH",
    "DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
};
