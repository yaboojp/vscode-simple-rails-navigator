// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "simple-rails-navigator" is now active!');

	const exclude_path = '**/{tmp,node_modules,vendor}/*';
	const commandsList = ['Model', 'View', 'Controller', 'Helper', 'Task', 'Spec', 'Javascript', 'Stylesheet'];

	let simple_rails_navigator = vscode.commands.registerCommand('extension.simple_rails_navigator', () => {
		vscode.window.showQuickPick(commandsList).then((selectedItem) => {
            if (selectedItem) {
				var files;
				var include_path;
				switch (selectedItem) {
					case 'Model':
						include_path = '**/app/models/**/*.rb';
						break;
					case 'View':
						include_path = '**/app/views/**/*.{erb,haml,slim}';
						break;
					case 'Controller':
						include_path = '**/app/controllers/**/*.rb';
						break;
					case 'Helper':
						include_path = '**/app/helpers/**/*.rb';
						break;
					case 'Task':
						include_path = '**/lib/tasks/**/*.{rb,rake}';
						break;
					case 'Spec':
						include_path = '**/spec/**/*.{rb}';
						break;
					case 'Javascript':
						include_path = '**/app/**/*.{js,coffee}';
						break;
					case 'Stylesheet':
						include_path = '**/app/**/*.{css,scss,sass}';
						break;
					default:
						break;
				}
				if (include_path) {
					files = vscode.workspace.findFiles(include_path, exclude_path);
				}
				if (files) {
					vscode.window.showQuickPick(files.then((urls) => {
						return urls.map((url) => {
							var splited_paths = url.path.split('/');
							var workspace_path = url.path.replace(vscode.workspace.rootPath + "/", "");
							return {
										label: workspace_path,
										// description: splited_paths[splited_paths.length -1],
										path: url.path.toString()
									};
						});
					})).then((item) => {
						if (item) {
							var path = vscode.Uri.parse(item.path);
							vscode.workspace.openTextDocument(path).then(doc => {
								vscode.window.showTextDocument(doc);
							})
						}
					});
				}
			}
		});
	});

	context.subscriptions.push(simple_rails_navigator);
}

// this method is called when your extension is deactivated
export function deactivate() {}
