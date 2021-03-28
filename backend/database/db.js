const config = require('../config')
var sqlite3 = require('sqlite3').verbose();
var sqlite = require('sqlite')
const fs = require('fs').promises;
const d3 = require('d3-dsv')

exports.getDB = async () => {
  try {

    const db = await sqlite.open({
      filename: config.db,
      driver: sqlite3.Database
    })

    return db
  } catch (err) {

    return Promise.reject(err);
  }
};

exports.setupDb = async () => {
  try {

    db = await this.getDB()

    await db.exec(`CREATE TABLE IF NOT EXISTS locations ( 
      geonameid TEXT, 
      name TEXT, 
      asciiname TEXT, 
      alternatenames TEXT, 
      latitude INTEGER, longitude INTEGER, 
      feature_class TEXT, 
      feature_code TEXT, 
      country_code TEXT, 
      cc2 TEXT, 
      admin1_code TEXT, 
      admin2_code TEXT, 
      admin3_code TEXT, 
      admin4_code TEXT,
      population TEXT,
      elevation INETGER,
      dem TEXT,
      timezone INTEGER,
      modification_date TEXT)`)

    result = await db.all('SELECT * FROM locations')

    if (result.length == 0) {

      var content = await fs.readFile(config.csv, "utf8");

      const rows = await d3.tsvParse(content)

      console.log(rows.length)

      i = 0
        for (row of rows) {
          await db.run(
            `INSERT INTO "locations" ( 
              geonameid, 
              name, 
              asciiname, 
              alternatenames, 
              latitude, 
              longitude, 
              feature_class, 
              feature_code, 
              country_code, 
              cc2, 
              admin1_code, 
              admin2_code, 
              admin3_code, 
              admin4_code,
              population,
              elevation,
              dem,
              timezone,
              modification_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [row.geonameid, row.name, row.asciiname, row.alternatenames, row.latitude,
              row.longitude, row.feature_class, row.feature_code, row.country_code, row.cc2,
              row.admin1_code, row.admin2_code, row.admin3_code, row.admin4_code,
              row.population, row.elevation, row.dem, row.timezone, row.modification_date
            ]
          )
          i ++;
          console.log(i)
      }
    }

    return
  } catch (err) {

    return Promise.reject(err);
  }
};
