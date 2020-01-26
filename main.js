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
})

async function createCustomer(customer){
	return customer;
};
async function loadCustomers(){
	return [];
}
async function loadProjects(){
	return [
		{
			name: 'Proyecto 1',
			path: './',
			cmd: '',
			customer: {
				name: 'Cliente 1'
			}
		},
		{
			name: 'Proyecto 2',
			path: './',
			cmd: '',
			customer: {
				name: 'Cliente 1'
			}
		},
	];
}
async function createProject(project){
	return project;
}
async function newRegProject(project, regs){
	return true;
}

exports.createCustomer = createCustomer;
exports.loadCustomers = loadCustomers;
exports.loadProjects = loadProjects;
exports.createProject = createProject;
exports.newRegProject = newRegProject;
