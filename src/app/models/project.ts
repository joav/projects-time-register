import { Customer } from './customer';

export interface Project {
	name:string;
	customer:Customer;
	path:string;
	cmd:string;
}
