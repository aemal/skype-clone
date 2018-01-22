const router = require("express").Router();

module.exports = function loginout(passport) {
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  });

  router
    .route("/login")
    .get((req, res) => res.send("Login page"))
    .post(
      passport.authenticate("signin", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true
      })
    );

  router
    .route("/register")
    .get((req, res) => res.send("register page"))
    .post(
      passport.authenticate("signup", {
        successRedirect: "/auth/login",
        failureRedirect: "/auth/register",
        failureFlash: true
      })
    );

  router.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["email", "public_profile"] })
  );

  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );
  ////// Twitter //////
  router.get("/twitter", passport.authenticate("twitter"));
  router.get(
    "/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/auth/login" })
  );

  return router;
};
