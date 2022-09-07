import * as vscode from 'vscode';

export interface Config{
    reminder:{
        only:boolean,
        times:string[]
    }
}

export class Configuration{
    static getConfiguration():vscode.WorkspaceConfiguration{
        return vscode.workspace.getConfiguration('WTE');
    }
}