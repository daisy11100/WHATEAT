/*
 * @Author: duanxinxin
 * @Date: 2022-09-05 22:16:10
 * @LastEditors: duanxinxin
 * @LastEditTime: 2022-09-07 10:58:34
 * @Description: 
 */
import 'dayjs/locale/zh-cn';
const dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
import * as vscode from 'vscode';
import { createNotice } from './components/Notice';
import { createScheduler } from './components/Scheduler';
import type { Scheduler } from './components/Scheduler';

dayjs.locale('zh-cn');
dayjs.extend(localizedFormat);
let scheduler:Scheduler;
export function activate(context:  vscode.ExtensionContext) {
	
	scheduler=createScheduler(context);
	scheduler.start();

	let disposable = vscode.commands.registerCommand('whateat.todayeat', () => {
		const notice=createNotice();
		notice.render();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

