const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const { exec } = require('child_process');

let win;
let status = 0;

function createWindow () {
		// Create the browser window.
	win = new BrowserWindow({
		width: 950,
		height: 700,
		backgroundColor: '#ffffff',
		icon: `file://${__dirname}/dist/assets/logo.png`,
		webPreferences: {
			nodeIntegration: true
		}
	})


	win.loadURL(`file://${__dirname}/dist/index.html`)

	// Event when the window is closed.
	win.on('closed', function (e) {
		if(status == 1){
			win = null;
		}
	})
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

	// On macOS specific close process
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// macOS specific close process
	if (win === null) {
		createWindow()
	}
});

const ProjectsSdk = require('./projects-sdk');

const sdk = new ProjectsSdk.new();

async function createCustomer(customer){
	try {
		return await (new ProjectsSdk.new()).createCustomer(customer);
	} catch (error) {
		console.log('creac-cliente',error);
		return null;
	}
};

async function loadCustomers(){
	try {
		return await (new ProjectsSdk.new()).getCustomers();
	} catch (error) {
		console.log('load-clientes',error);
		return [];
	}
}
async function loadProjects(){
	try {
		return await (new ProjectsSdk.new()).getProjects();
	} catch (error) {
		console.log('load-p',error);
		return [];
	}
}
async function createProject(project){
	try {
		return await (new ProjectsSdk.new()).createProject(project);
	} catch (error) {
		console.log('creat-p',error);
		return null;
	}
}
async function newRegProject(project, regs){
	try {
		return await (new ProjectsSdk.new()).regProject({
			project: project,
			regs: regs
		});
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function getReport(dateInit = null, dateFinal = null, num = 0) {
	try {
		return await (new ProjectsSdk.new()).getReg(dateInit, dateFinal, num);
	} catch (error) {
		console.log(error);
		return [];
	}
}

exports.selectDir = function selectDir() {
	return dialog.showOpenDialog(win, {
		properties: ['openDirectory']
	});
}

/**
 * Open a project
 * @param {Project} project The project to open
 */
function openProject(project) {
	if(/code/.test(project.cmd)){
		exec(project.cmd + ' ' + project.path);
	}else{
		let cmd = '';
		switch(process.platform){
			case 'darwin': cmd = 'open';break;
			case 'win32': case 'win64': cmd = 'start';break;
			default: cmd = 'xdg-open';break;
		}
		dialog.showOpenDialog(win, {
			properties: ['openFile']
		}).then(r=>{
			if(!r.canceled){
				exec(cmd + ' ' + r.filePaths[0]);
			}
		})
	}
}

exports.openProject = openProject;
exports.close = function(){
	status = 1;
	win.close();
}

exports.createCustomer = createCustomer;
exports.loadCustomers = loadCustomers;
exports.loadProjects = loadProjects;
exports.createProject = createProject;
exports.newRegProject = newRegProject;
exports.getReport = getReport;

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
