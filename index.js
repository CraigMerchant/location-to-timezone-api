const express = require("express");
const geoTz = require("geo-tz");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  if (!req.query.latitude || !req.query.longitude) {
    res.status(400).send("Valid latitude and longitude required");
  } else {
    const timezones = geoTz(req.query.latitude, req.query.longitude);

    if (timezones && timezones.length > 0) {
      res.json({ timezone: timezones[0] });
    } else {
      res.status(404).send("Could not find timezone");
    }
  }
});

app.listen(port);
