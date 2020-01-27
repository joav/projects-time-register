const { app, BrowserWindow } = require('electron')

let win;

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
	win.on('closed', function () {
		win = null
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
		return await sdk.createCustomer(customer);
	} catch (error) {
		console.log(error);
		return null;
	}
};

async function loadCustomers(){
	try {
		return await sdk.getCustomers();
	} catch (error) {
		console.log(error);
		return [];
	}
}
async function loadProjects(){
	try {
		return await sdk.getProjects();
	} catch (error) {
		console.log(error);
		return [];
	}
}
async function createProject(project){
	try {
		return await sdk.createProject(project);
	} catch (error) {
		console.log(error);
		return null;
	}
}
async function newRegProject(project, regs){
	try {
		return await sdk.regProject({
			project: project,
			regs: regs
		});
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.createCustomer = createCustomer;
exports.loadCustomers = loadCustomers;
exports.loadProjects = loadProjects;
exports.createProject = createProject;
exports.newRegProject = newRegProject;
