import * as vscode from 'vscode';
import { getMessage } from '../generators/message';


class Notice{
    public message:string;
    constructor(
        public renderfn=vscode.window.showInformationMessage
    ){
        this.message=getMessage();
    }

    render(){
       this.renderfn(this.message);
    }
}


export function createNotice(renderfn?:any){
    return new Notice(renderfn);
}