const login_values = require("../model/addSignUpValues-model");
const jwt = require("jsonwebtoken");
const bcryt = require("bcrypt");

module.exports = {
  // add login uservalues

  addloginvalues: function (req, res) {
    const data = req.body;
    let login_val = new login_values();
    login_val.username = data.username;
    login_val.email = data.email;
    login_val.password = bcryt.hashSync(data.password, 8);
    login_val.nationality = data.nationality;
    login_val.university = data.university;
    login_val.highest_Qualification = data.highest_Qualification;
    login_val.major = data.major;
    login_val.job_prefrence = data.job_prefrence;
    login_val.status = true;
    login_val.jwtToken = "";

    login_val.save(function (err, responce) {
      if (err) {
        console.error("error occured", err);
        return res.send({
          code: 401,
          result: err,
        });
      } else {
        console.log("response");
        return res.send({
          code: 200,
          result: responce,
        });
      }
    });
  },
  getloginvalues: function (req, res) {
    var token = req.headers["x-access-token"];
    if (!token) {
      res.send({
        code: "401",
        status: "token not available",
      });
      process.exit();
    } else {
      jwt.verify(token, process.env.DB_SECRET, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          var name = req.body.name;
          login_values.find({ name }, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send({ result });
            }
          });
        }
      });
    }

    login_values.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ result });
      }
    });
  },

  //  to Delete login user

  deleteLoginUser: function (req, res) {
    id = req.body.id;
    login_values.findByIdAndRemove(id, function (err, result) {
      if (err) {
        console.log("err occured", err);
      } else {
        res.send({ status: "Data Deletion successful" });
      }
    });
  },
  loginProcess: function (req, res) {
    username = req.query.username;
    password = req.query.password;
    login_values.find({ username }, function (err, result) {
      if (err) {
        console.log(err);
        res.send({
          code: "401",
          status: "Error occured while login",
        });
      } else {
        console.log(result);
        if (result[0].username != username) {
          console.log("invalid uername");
          process.exit();
        } else {
          console.log("username valid");
          passwordvalid = bcryt.compareSync(password, result[0].password);
          if (!passwordvalid) {
            res.send({
              code: "401",
              status: "invalid password",
            });
            process.exit();
          } else {
            console.log("password valified");
            var token = jwt.sign({ id: result[0]._id }, process.env.DB_SECRET, { expiresIn: 86400 });
            result[0].jwtToken = token;
            result[0].save({}, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.send({ result });
              }
            });
          }
        }
      }
    });
  },
  getuserloginvalues: function (req, res) {
    email = req.body.username;
    password = req.body.password;
    login_values.find({ email }, function (err, result) {
      if (err) {
        res.send({
          code: "401",
          status: "Error Occured while login",
        });
      } else {
        if (result[0] == null) {
          res.send({
            code: "401",
            status: "not valid email",
          });
        } else {
          console.log(result);
          var passwordvalidor = bcryt.compareSync(password, result[0].password);
          if (!passwordvalidor) {
            res.send({
              code: "401",
              status: "password not valid",
            });
          } else {
            res.send({ result });
          }
        }
      }
    });
  },
  UpdateAccount: (req, res) => {
    data = req.body;
    id = req.body.id;
    login_values.findByIdAndUpdate(
      id,
      {
        $set: {
          username: data.username,
          email: data.email,
          password: bcryt.hashSync(data.password, 8),
          nationality: data.nationality,
          university: data.university,
          highest_Qualification: data.highest_Qualification,
          major: data.major,
          job_prefrence: data.job_prefrence,
          updated_at: Date.now(),
        },
      },
      { multi: true },
      function (err, result) {
        if (err) {
          res.send({
            status: false,
            Error: err,
          });
        } else {
          if (result == null) {
            res.send({
              status: false,
            });
          } else {
            res.send({
              status: true,
              result: result,
            });
          }
        }
      }
    );
  },
};
