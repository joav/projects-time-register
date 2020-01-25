import { Customer } from './customer';

export interface Project {
	name:string;
	customer:string;
	_customer:Customer;
	path:string;
	cmd:string;
}
