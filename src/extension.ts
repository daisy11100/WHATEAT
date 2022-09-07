/*
 * @Author: duanxinxin
 * @Date: 2022-09-05 22:16:10
 * @LastEditors: duanxinxin
 * @LastEditTime: 2022-09-06 10:27:23
 * @Description: 
 */
import * as vscode from 'vscode';
import { createNotice } from './components/Notice';


export function activate(context:  vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('whateat.helloWorld', () => {
		const notice=createNotice();
		notice.render();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
