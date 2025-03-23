const db = require('../config/db');

const User = {
  createUser: (user, callback) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    db.query(query, [user.name, user.email, user.password, user.role], callback);
  },
  getUserByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = $1', [email], callback);
  },


  getWorkers: ( callback) => {
    db.query('SELECT * FROM users WHERE role = $1',['worker'], callback);
  },


  getWorkerById: (id, callback) => {
    let query = 'SELECT * FROM users WHERE role = $1 AND user_id = $2';
    const params = ['worker',id];
    
    
    db.query(query, params, callback);
  }
};


module.exports = User;
