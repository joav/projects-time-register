const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const creationQueryCustomers = `CREATE TABLE IF NOT EXISTS customers (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT
);`;
const creationQueryProjects = `CREATE TABLE IF NOT EXISTS projects (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	customer INTEGER,
	path TEXT,
	cmd TEXT,
	modified TEXT,
	FOREIGN KEY (customer)
		REFERENCES customers (id)
			ON DELETE CASCADE
			ON UPDATE NO ACTION
);`;
const creationQueryRegs = `CREATE TABLE IF NOT EXISTS reg_times (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	project INTEGER,
	time INTEGER,
	date TEXT,
	FOREIGN KEY (project)
		REFERENCES projects (id)
			ON DELETE CASCADE
			ON UPDATE NO ACTION
);`;

class ProjectsSDK {
	fs = require('fs');
	db = new sqlite3.Database('projects.db', this.onOpen.bind(this));
	projects = [];
	constructor(){
		this.db.serialize(()=>{
			this.db.run(creationQueryCustomers, (r, err) => {
				if(err){
					this.log(err);
				}
			});
			this.db.run(creationQueryProjects, (r, err) => {
				if(err){
					this.log(err);
				}
			});
			this.db.run(creationQueryRegs, (r, err) => {
				if(err){
					this.log(err);
				}
			});
		});
	}

	/**
	 * Create a customer
	 * @param {Customer} customer
	 * @returns {Promise<Customer>}
	 */
	createCustomer(customer){
		return new Promise((resolve, reject)=>{
			const stmt = this.db.prepare("INSERT INTO customers(name) VALUES (?)");
			const _this = this;
			stmt.run(customer.name, function(e) {
				if(e){
					_this.log(e);
					reject(e);
				}else{
					customer.id = this.lastID;
					resolve(customer);
				}
			})
		});
	}

	/**
	 * Get the customers
	 * @returns {Customer[]}
	 */
	getCustomers(){
		return new Promise((resolve, reject) => {
			this.db.all("SELECT * FROM customers ORDER BY name ASC", (err, rows)=>{
				if(err){
					this.log(err);
					reject(err);
				}else{
					resolve(rows);
				}
			});
		});
	}

	/**
	 * Get the projects
	 * @returns {Project[]}
	 */
	getProjects(){
		return new Promise((resolve, reject)=>{
			this.db.serialize(() => {
				this.db.all('SELECT p.name as name, p.id as id, p.path as path, p.cmd as cmd, c.name as cname from projects as p inner join customers as c on(c.id = p.customer) order by p.modified DESC', (err, rows) => {
					if(err){
						this.log(err);
						reject(err);
					}else{
						resolve(rows.map(r => ({
							id: r.id,
							name: r.name,
							path: r.path,
							cmd: r.cmd,
							customer: {
								id: r.customer,
								name: r.cname
							}
						})));
					}
				});
			});
		})
	}

	/**
	 * Create a project
	 * @param {Project} project The project to create
	 * @returns {Promise<Project>}
	 */
	createProject(project){
		return new Promise((resolve, reject) => {
			const _this = this;
			const stmt = this.db.prepare("INSERT INTO projects(name,path,cmd,customer,modified) VALUES(?, ?, ?, ?, datetime('now'))");
			stmt.run(project.name, project.path, project.cmd, project.customer.id, function(err){
				if(err){
					_this.log(err);
					reject(err);
				}else{
					project.id = this.lastID;
					resolve(project);
				}
			})
		});
	}

	/**
	 * Reg a time consumed in project
	 * @param {RegProjectToSave} regProject The regproject data
	 * @returns {Promise<boolean>}
	 */
	regProject(regProject){
		return new Promise((resolve, reject) => {
			const _this = this;
			const stmt = this.db.prepare("INSERT INTO reg_times(project, time, date) VALUES(?, ?, datetime('now'))");
			const time = regProject.regs.reduce((prev, curr) => prev + (curr.final - curr.init),0);
			stmt.run(regProject.project.id, time, (err) => {
				if(err){
					_this.log(err);
					reject(err);
				}else{
					resolve(true);
				}
			})
		});
	}

	/**
	 * Get registers in a date range
	 * @param {Date} dateInit The initial date
	 * @param {Date} dateFinal The final date
	 * @returns {Promise<RegProject[]>}
	 */
	getReg(dateInit = null, dateFinal = null, num = 0){
		let query = "SELECT *, p.name as pname FROM reg_times INNER JOIN projects as p ON(p.id = project) ";
		if((dateInit || dateFinal) && !num){
			query += " WHERE "
			if(dateInit && dateFinal){
				query += " date >= '" + this.getDate(dateInit) + "' AND date <= '" + this.getDate(dateFinal) + "'";
			}else if(dateInit){
				query += " date >= '" + this.getDate(dateInit) + "'";
			}else{
				query += " date <= '" + this.getDate(dateInit) + "'";
			}
			query += " ORDER BY date DESC";
		}else if(num > 0){
			query += " ORDER BY date DESC LIMIT " + num;
		}
		this.db.all(query, (err, rows) => {
			if(err){
				this.log(err);
				reject(err);
			}else{
				resolve(rows.map(r => ({
					id: r.id,
					project: {
						id: r.project,
						name: r.pname
					},
					time: r.time,
					date: r.date
				})));
			}
		});
	}

	/**
	 * Get formated date
	 * @param {Date} date The date
	 */
	getDate(date){
		return date.getFullYear() + '-' + this.addZero(date.getMonth() + 1) + '-' + this.addZero(date.getDate());
	}

	addZero(num){
		return num < 10?'0'+num:num;
	}

	/**
	 * Detect errors on open
	 * @param {Error} err
	 */
	onOpen(err){
		if(err){
			this.log(err);
		}
	}

	/**
	 * Log a error
	 * @param {Error} err
	 */
	log(err){
		this.fs.writeFile('error.log', (new Date()).toLocaleString() + ' - ' + err.message + "\n",{flag: 'a'}, e => {
			console.log(e);
		});
	}
}

/**
 * @typedef Customer
 * @type {object}
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef Project
 * @type {object}
 * @property {number} id
 * @property {string} name
 * @property {string} path
 * @property {string} cmd
 * @property {string} modified
 * @property {Customer} customer
 */

/**
 * @typedef RegProject
 * @type {object}
 * @property {number} id
 * @property {Project} project
 * @property {number} time
 * @property {string} date
 */

/**
 * @typedef RegTime
 * @type {object}
 * @property {number} init
 * @property {number} final
 */

/**
 * @typedef RegProjectToSave
 * @type {object}
 * @property {Project} project
 * @property {RegTime[]} regs
 */

exports.new = ProjectsSDK;
