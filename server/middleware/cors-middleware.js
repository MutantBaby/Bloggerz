const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
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

export default corsMiddleware;
