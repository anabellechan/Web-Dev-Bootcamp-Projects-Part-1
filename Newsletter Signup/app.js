// const express = require("express");
// const bodyParser = require("body-parser");
// const { Http2ServerRequest } = require("http2");
// const app = express();
// const https = require("node:https");

// app.use(express.static("public")); //for static files by a relative url, relative to the public folder
// app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/signup.html");
// });

// app.get("/", function (req, res) {
//   console.log("woohoo");
//   res.sendFile(__dirname + "/signup.html");
// });

// app.post("/failure"),
//   function (req, res) {
//     res.redirect("/");
//   };

// app.post("/", function (req, res) {
//   const firstName = req.body.fName;
//   const lastName = req.body.lName;
//   const email = req.body.email;
//   const data = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: firstName,
//           LNAME: lastName,
//         },
//       },
//     ],
//   };
//   const jsonData = JSON.stringify(data);
//   const url = "https://us8.api.mailchimp.com/3.0/lists/9c704227bd";

//   const options = {
//     method: "POST",
//     auth: "angela1:953005bfed97051cbe0ff6100f6d1e33-us8",
//   };

//   const request = https.request(url, options, function (response) {
//     console.log("hamburger code status!!", response);
//     if (response.statusCode === 200) {
//       console.log("SUCCESS WAHAHA");
//       res.sendFile(__dirname + "/success.html");
//     } else {
//       res.sendFile(__dirname + "/failure.html");
//     }

//     response.on("data", function (data) {
//       // console.log("MEEPS", JSON.parse(data));
//     });
//   });

//   request.write(jsonData); //pass the data to mailchimp server
//   request.end();
//   console.log(firstName, lastName, email);
// });

//API KEY 953005bfed97051cbe0ff6100f6d1e33-us8
//Audience ID 9c704227bd

// / *** Constant Require Section:

const express = require("express");
// const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { Http2ServerRequest } = require("http2");
// const https = require("node:https");

const app = express();

// *** Body Parser ***
app.use(bodyParser.urlencoded({ extended: true }));

// *** Static Folder ***
app.use(express.static("public"));
// app.use("/public", express.static(path.join(__dirname, "public")));

// *** Tracking HTML File ***
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signuporig.html");
});

// *** Signup Route ***
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // *** Construct Requesting data ***
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // *** Stringify inputed data ***
  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/9c704227bd";

  const options = {
    method: "POST",
    auth: "angela1:953005bfed97051cbe0ff6100f6d1e33-us8",
  };

  // *** Requesting and send back our data to mailchimp ***
  const request = https.request(url, options, function (response) {
    // *** Checking our code statment ***
    // console.log("FRIES", response.statusCode);
    // if (response.statusCode === 200) {
    //   res.sendFile(__dirname + "/success.html");
    // } else {
    //   res.sendFile(__dirname + "/failure.html");
    // }
    response.on("data", function (data) {
      console.log("iM HEREEE");
      const mydata = JSON.parse(data);
      console.log("my data! ERROR CODE", mydata);

      if (mydata.errors.length !== 0) {
        console.log("FAILURE UH OH");
        res.sendFile(__dirname + "/failure.html");
      } else {
        console.log("SUCCESS!!!");
        res.sendFile(__dirname + "/success.html");
      }
    });
  });

  // *** Showing the status code on hyper terminal ***
  console.log("POP", request.write(jsonData));
  request.end();
});

// *** Redirecting Codes: ***

// *** from Failure page to Signup page ***
app.post("/failure", function (req, res) {
  res.redirect("/");
});
// *** from Success page to Signup page ***
app.post("/success", function (req, res) {
  res.redirect("/");
});

// *** Our Server PORT Starter ***
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port: 3000!");
});
