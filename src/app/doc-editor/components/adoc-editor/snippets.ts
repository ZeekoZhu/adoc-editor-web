import * as ace from 'ace-builds';

const snippetsDef = `
snippet code
	[source, \${1:lang}]
	----
	----
snippet table
	|===
	\${1}
	|===
`;

export const addSnippets = (editor) => {
    ace.config.loadModule('ace/ext/language_tools', m => {
        editor.setOptions({
            enableSnippets: true,
        });
        ace.config.loadModule('ace/snippets', x => {
            const snippets = x.snippetManager.parseSnippetFile(snippetsDef);
            x.snippetManager.register(snippets, 'asciidoctor');
        });
    });
};
