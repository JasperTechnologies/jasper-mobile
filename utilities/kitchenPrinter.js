// const ThermalPrinter = require("node-thermal-printer").printer;
 
export async function printKitchenReceipt(orderNumber, menuItems, type, ipAddress){

	const printer = getPrinterInterface('EPSON', "tcp://192.168.42.6/")
	
	let isConnected = await testPrinterConnection(printer);       // Check if printer is connected, return bool of status
	if(isConnected){
		return await print(orderNumber, menuItems, printer)
	} 
	return false
}

export async function testPrinterConnection(printer){
	for (var i = 0; i < 3; i++){
		let isConnected = await printer.isPrinterConnected();       // Check if printer is connected, return bool of status
		if(isConnected){
			return isConnected
		}
		await sleep()
	}
	return false
}


async function sleep() {
	await timeout(3000);
}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


export function getPrinterInterface(type, ipAddress){
	const printerType = type === 'EPSON' ? 'epson' : 'star'
	let printer = new ThermalPrinter({
		type: printerType,                               			    // Printer type: 'star' or 'epson'
		interface: ipAddress,                       							// Printer interface
		characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
		removeSpecialCharacters: false,                           // Removes special characters - default: false
		lineCharacter: "=",                                       // Set character for lines - default: "-"
		options:{                                                 // Additional options
			timeout: 3000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
		}

	});
	return printer
}

export async function print(orderNumber, cart, printer) {
	printer.alignCenter();    
	printer.setTextDoubleHeight(); 
	printer.setTextDoubleWidth();                              
	printer.println(`Order #${orderNumber}`);         
	printer.println(""); 
	printer.println(""); 
	printer.println(""); 
	printer.println(""); 
	printer.setTextNormal();
	printer.alignLeft(); 
	cart.forEach(item => {
		printer.println(`${item.title} x${item.form.quantity}`);
		item.form.optionValues.forEach(optionValue => {
			printer.println(`-- ${optionValue.title}`);
		})
		printer.println(""); 
	})

	printer.cut();  
														
	let execute = await printer.execute(); 
	return execute
}
// example(100, [{title: 'boba tea', quantity: 2, optionValues: [{title: 'mango gel',}, { title: 'coco butter'}]}, {title: 'crab beet', quantity: 1, optionValues: []}])