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
        ace.config.loadModule('ace/snippets', m => {
            const snippets = m.snippetManager.parseSnippetFile(snippetsDef);
            m.snippetManager.register(snippets, 'asciidoctor');
        });
    });
};
