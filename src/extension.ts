import { domainToASCII } from "url";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "center-cursor.setCursor",
    () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("not exist activeTextEditor");
        return;
      }

      let range = editor.visibleRanges[0];
      if (range.isSingleLine) {
        return;
      }
      let newLine =
        range.start.line + ftoi((range.end.line - range.start.line) / 2);
      let newPos = editor.document.validatePosition(
        new vscode.Position(newLine, editor.selection.end.character)
      );
      editor.selection = new vscode.Selection(newPos, newPos);
    }
  );

  context.subscriptions.push(disposable);
}

function ftoi(x: number): number {
  return x | 0;
}

// this method is called when your extension is deactivated
export function deactivate() { }
