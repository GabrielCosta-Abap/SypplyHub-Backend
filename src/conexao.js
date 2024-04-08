
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'roundhouse.proxy.rlwy.net',
  database: 'railway',
  password: 'wGLNSxPfzxHfgyPhSddvlKDXAmATGdrw',
  port: 19351,
});

module.exports = { pool };