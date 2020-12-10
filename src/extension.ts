// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "simple-rails-navigator" is now active!')

	const exclude_path = '**/{tmp,node_modules,vendor}/*'
	const commandsList = [
		'model',
		'view',
		'controller',
		'service',
		'decorator',
		'form',
		'job',
		'helper',
		'task',
		'spec',
		'javascript',
		'stylesheet',
		'mailer',
		'serializer',
		'uploader',
		'validator',
		'config',
	]

	let simple_rails_navigator = vscode.commands.registerCommand('extension.simple_rails_navigator', () => {
		vscode.window.showQuickPick(commandsList).then((selectedItem) => {
			if (selectedItem) {
				var files;
				var include_path;
				switch (selectedItem) {
					case 'model':
						include_path = '**/app/models/**/*.rb'
						break
					case 'view':
						include_path = '**/app/views/**/*.{erb,haml,slim}'
						break
					case 'controller':
						include_path = '**/app/controllers/**/*.rb'
						break
					case 'service':
						include_path = '**/app/services/**/*.rb'
						break
					case 'decorator':
						include_path = '**/app/decorators/**/*.rb'
						break
					case 'form':
						include_path = '**/app/forms/**/*.rb'
						break
					case 'job':
						include_path = '**/app/jobs/**/*.rb'
						break
					case 'helper':
						include_path = '**/app/helpers/**/*.rb'
						break
					case 'task':
						include_path = '**/lib/tasks/**/*.{rb,rake}'
						break
					case 'spec':
						include_path = '**/spec/**/*.{rb}'
						break
					case 'javascript':
						include_path = '**/app/**/*.{js,coffee}'
						break
					case 'stylesheet':
						include_path = '**/app/**/*.{css,scss,sass}'
						break
					case 'mailer':
						include_path = '**/app/mailers/**/*.rb'
						break
					case 'serializer':
						include_path = '**/app/serializers/**/*.rb'
						break
					case 'uploader':
						include_path = '**/app/uploaders/**/*.rb'
						break
					case 'validator':
						include_path = '**/app/validators/**/*.rb'
						break
					case 'config':
						include_path = '**/config/**/*'
						break
					default:
						break
				}

				if (include_path) {
					files = vscode.workspace.findFiles(include_path, exclude_path)
				}

				if (files) {
					vscode.window.showQuickPick(files.then((urls) => {
						urls.sort((a, b) => a.path > b.path ? 1 : -1 )

						return urls.map((url) => {
							// var splited_paths = url.path.split('/');
							var workspace_path = url.path.replace(vscode.workspace.rootPath + "/", "")

							return {
										label: workspace_path,
										// description: splited_paths[splited_paths.length -1],
										path: url.path.toString()
									}
						})
					})).then((item) => {
						if (item) {
							var path = vscode.Uri.parse(item.path)
							vscode.workspace.openTextDocument(path).then(doc => {
								vscode.window.showTextDocument(doc)
							})
						}
					})
				}
			}
		})
	})

	context.subscriptions.push(simple_rails_navigator)
}

// this method is called when your extension is deactivated
export function deactivate() {}
